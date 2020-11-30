# Items
> An item is a record that can contain data and attachments

## Folders and Documents
The Huddle API has the concept of `documents` and `folders`. We use a combination of these to represent **Items**. In the code base, and conceptually, we refer to them as "items," and try to ignore the underlying implementation. 

ℹ️ _I will mostly use the term "item" moving forward, but the underlying records in the database are a `folder` and one or more `documents`._

To represent an item we create a `folder`, which holds `documents`. We do not want this folder to show up in the list of actual folders, so we give it a special tag property of `isItem`, then we can filter those out on the front end. 

On the front-end we treat these folders only as a place to store our documents. **No item-related data is actually stored in this folder**. To store item data (name, type, or other attributes), we create a `document` with the tag `isMaster`. 

## Working with Items on the Front End
We don't actually store the folder that represents the item in our Redux state.

To request a list of items from the API we use the `folder::list` endpoint. This API will return us a list of folders and a list of documents. We then loop over all the folders and find all the ones that have the `isItem` tag. For each of these folders we find the master item, and create an Item (which is the entity we store in redux). We will attach all the other documents that are in the folder as `files`, and set the `folderUniqueName` on the item so that we can use this folder - for example to add/remove attachments, or share the item. 

The code to parse items lives in <a href="../src/util/itemsHelper.js">src/util/itemsHelper.js#createFromFolders</a>.

## Creating an Item
_The order of operations is not important, **but all of the values we are setting must be set correctly** or the Huddle mobile app will not know how to use the items you create._

Here are the steps that the Huddle mobile app takes to create an item:

1. Create a folder by calling the `folder::create` endpoint. Your folder should have the `isItem` tag.
2. Create your master item by calling the `document::upload` endpoint. This master item should contain all of your item data in the `custom` field, and the `isMaster` tag.
3. Add the master item to the folder by calling `folder::addDoc`.

If all three of the above steps succeed, the item is created in the database.

If you are uploading attachments to your item, the above steps still happen in the same order. We added "re-try" functionality, so if any of the following steps fail the item will still exist in the database, and the user will be able to try their attachment upload again. 

We use pre-signed S3 urls, which we get from the Huddle API, and then upload our attachments directly to S3 from the mobile app.

### Adding attachments
The following 3 steps will happen for each attachment you are trying to upload:

4. Get a pre-signed S3 URL from the Huddle background by calling `document::preupload`.
5. Upload your file directly to S3 using the special <a href="../src/api/serverAgent.js">src/api/serverAgent.js#uploadImage</a> function.
6. Upload your attachment to Huddle by creating a document via `document::upload`. 
    - Provide the `internalAccessName` generated in step 4.
    - **Note:** In the case of adding an image attachment it is up to the client to generate a thumbnail. Your thumbnail should be 144x144px, and saved as a base64 string on the `document`.

After all of our attachments are processed (whether or not 4-6 execute successfully; see failure action below), we will add all successfully created attachments to the folder created above in step 1:

7. Add all successfully uploaded documents to the folder created in step 1. by calling `folder::addDoc`. 

_We need a Huddle `docUniqueName` in order to add a document to our folder, so only attachments that are successfully uploaded (steps 4-6 succeed) are added to the folder in step 7. Any attachments that fail to upload can be re-tried by the user._

## Updating Items
When you want to update your item content, such as its name or any custom field values, you want to update the **document** using the `document::update` endpoint.

If you want to add/remove any attachments you will be using the folder api: `folder::addDoc` and `folder::removeDoc`. Use the `folderUniqueName` field stored on the item in redux.

## Sharing Items
When you share an item you will **always** share the folder that holds the item. If you share just the master item, the website will not know how to render any attachments.
