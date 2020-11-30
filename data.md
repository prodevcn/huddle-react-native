Data Item Structure
===================

*Data-only* items should follow a standard JSON schema.

## Types

* medication
* insurance
* allergy
* active problem
* social history
* vital sign
* procedure
* diagnosis
* goal
* demographic 
* progress note
* active directive
* provider
* encounter note
* patient instruction
* vaccination
* pharmacy

## Core Data Types

All data item will have:

* type - from the list above
* start - The date and time of the start of what makes sense for the item. *Not* the date and time the item was added to Huddle. That should already be stored in the timestamp of the API call.
* displayName - this is part of the parent data structure, not the item. Also sometimes called *filename*.
* note - This is also not part of the data item structure. It will use the text field of the parent document data.

## Specific Data Types

In addition to the core data listed above, the JSON structure of data-only items should include these fields for their respective types.

### Medication

* instructions (e.g. "take 2 twice a day")
* status (active, etc. - we may need a list)

### Insurance

*displayName* should be name of provider.
*start* should be issued date

* enrollee name
* enrollee id
* group number

There is a lot more about this. An old card of mine has a ton of phone numbers on the back: customer service, find providers, fraud, metal health preauth, provider claims and benefits. Maybe we need to to treat these "data only" items as a purely flexible type with default fields and the ability to add or remove whatever is appropriate.
