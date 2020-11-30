import React from 'react';
import { ScrollView, Linking, View } from 'react-native';

import Text from '/component/Text';
import BulletedListItem from '/component/BulletedListItem';
import styles from './styles';

const PrivacyPolicy = () => (
  <ScrollView
    contentInsetAdjustmentBehavior="automatic"
    contentContainerStyle={styles.content}
  >
    <Text.H1 style={styles.title}>Privacy policy</Text.H1>

    <Text color="medium" style={styles.paragraph}>
      <Text weight="medium">
        DrFirst will not sell your data.
      </Text>
      {' '}
      DrFirst.com, Inc. (“DrFirst”) is committed to safeguarding
      your privacy. This policy (“Privacy Policy”)
      explains what information we gather, use, and share when you use
      the Huddle application. By using
      {' '}
      <Text underline>
        Huddle
      </Text>
      {' '}
      you agree to be bound by the terms of this privacy
      policy and the Terms of Use.
    </Text>

    <Text.H4 style={styles.sectionItem}>Information we collect</Text.H4>

    <Text color="medium" style={styles.paragraph}>
      We may collect Personal or Non-Personal Information from you or about third parties for whom
      you provide information to the Huddle application. “Personal Information” refers to any
      information that specifically identifies you as an individual that you provide in
      connection with your use of our Site. Personal Information may include but is not limited to
      your name, telephone number, email address, postal address, and location. Personal Information
      may also include prescription information or other medical information.
      “Non-Personal Information” is any information you provide to us that cannot be used
      to determine your identity. The types and amount of information collected for the features
      listed above will vary depending on your use of the Huddle application.
      The requested Personal Information may include: first and last name, email address,
      and telephone number. For some activities, you may be asked to create a username
      and/or password and/or to provide additional, demographic information,
      including your age, date of birth and/or gender.
    </Text>

    <Text.H4 style={styles.sectionItem}>How We Collect Information About You</Text.H4>

    <Text color="medium" style={styles.paragraph}>
      We only obtain Personal Information that you provide to us, such as when you request
      information from DrFirst, or transfer information from other
      applications or stored on a device. By using Huddle and submitting Personal
      Information, you consent to the collection and use of your Personal
      Information by us as described in this Privacy Policy. In addition,
      when you access or visit Huddle, we and our service providers and
      others who host Huddle may use technology that can recognize, collect,
      and transmit information that is associated with you, but which does
      not personally identify you.
    </Text>

    <Text.H4 style={styles.sectionItem}>How we use information collected</Text.H4>

    <Text color="medium" style={styles.paragraph}>
      To the extent permitted by applicable law, we use information collected or obtained when you
      use Huddle, including Personal Information for the purposes set out below: Market research;
      Creating new features and services; Development of services, new and updated products;
      Responding to feedback, questions, and communications concerning our products or services;
      Informing you about our services which may include contacting you by telephone
      (including by SMS text); and Maintenance and administration of Huddle.
    </Text>

    <Text.H4 style={styles.sectionItem}>IP Addresses</Text.H4>

    <Text color="medium" style={styles.paragraph}>
      We may keep track of Internet Protocol (IP) addresses to (among other things):
      (i) troubleshoot technical concerns,
      (ii) maintain website safety and security,
      (iii) restrict access to our Site to certain users, and,
      (iv) to better understand how Huddle is utilized. An IP address is a number that is used by
      computers on the network to identify your computer every time you log on to the Internet.
    </Text>

    <Text.H4 style={styles.sectionItem}>Log Files</Text.H4>

    <Text color="medium" style={styles.paragraph}>
      We (or a vendor on our behalf) may collect information in the form of logs – files that record
      activity and gather statistics about users’ habits in the Huddle application.
      These entries help us gather (among other things) (i) a user’s browser type and operating
      system, (ii) information about a user’s session (such as the URL they came from,
      the date and time they visited the application, and which pages they’ve viewed
      on our site and for how long), and, (iii) other similar navigational or click-stream data.
      We also use information captured in log file for our internal marketing and demographic
      studies, so we can constantly improve and customize the online services we provide you.
    </Text>

    <Text.H4 style={styles.sectionItem}>Business Interests</Text.H4>

    <Text color="medium" style={styles.paragraph}>
      We may combine (aggregate) your Non-Personal information with other consumers’
      information or other publicly available information to help us satisfy our
      legitimate business interests, such as performing trend analysis or market studies;
      identify consumer preferences or interests; set prices; perform billing functions;
      establish credit; or comply with government regulations. We may also share anonymized data,
      such as statistical or demographic information in aggregate form, with third parties
      for research or marketing purposes. However, this anonymized data will not contain your
      individually identifiable Personal Information.
    </Text>

    <Text.H4 style={styles.sectionItem}>Disclosure of Information to Third Parties</Text.H4>

    <Text color="medium" style={styles.paragraph}>
      We will disclose your Personal Information to third parties you designate in your use of the
      Huddle application. Any disclosures that we make will be in accordance with the
      Terms of Services. We disclose your Personal Information to our service providers
      that we engage to provide certain services, such as hosting and maintenance, data storage,
      customer management and disaster recovery. We expect our service providers to use reasonable
      measures in order to protect your privacy and Personal Information from unauthorized access,
      in accordance with our agreements with them and applicable law. To the extent permitted by
      our agreements and applicable law, we also reserve the right to make your
      Personal Information available: to third party marketing and advertising companies;
      to comply with any applicable law, regulation, a court or other legal process, or enforceable
      government request; to take appropriate action regarding any use of our application that may
      violate any law or regulation; to protect the health, safety, security, property, and
      interests or rights of us or others; to investigate or respond to or resolve problems or
      inquiries or defend our interests; and as otherwise necessary or useful for us to conduct
      our business, so long as such use is permitted by law; and as directed by You.
    </Text>

    <Text color="medium" style={styles.paragraph}>
      <Text weight="medium">California privacy rights.</Text>
      {' '}
      If you are a resident of the State of California, under the California
      Consumer Privacy Act of 2018 (CCPA),
      you have the following rights with respect to your information
      collected by companies conducting business
      in California:
    </Text>

    <View style={styles.listItems}>
      <BulletedListItem>
        <Text color="medium">
          <Text underline>
            Right to Access Personal Information We Collect
          </Text>
          .
          {' '}
          You have the right to request a copy of Personal Information we collect
          about you, subject to certain restrictions.
        </Text>
      </BulletedListItem>

      <BulletedListItem>
        <Text color="medium">
          <Text underline>
            Right to Access Personal Information We Collect
          </Text>
          .
          {' '}
          You have the right to request a copy of Personal Information we collect
          about you, subject to certain restrictions.
        </Text>
      </BulletedListItem>

      <BulletedListItem>
        <Text color="medium">
          <Text underline>
            Right to Access Personal Information We Sell or Disclose to Third Parties
          </Text>
          .
          {' '}
          You have the right to request a copy of your Personal Information we sell or disclose
          to third parties, subject to certain restrictions.
        </Text>
      </BulletedListItem>

      <BulletedListItem>
        <Text color="medium">
          <Text underline>
            Right to Be Free from Discrimination
          </Text>
          .
          {' '}
          You have the right to be free from discrimination for exercising your rights under the
          CCPA.
        </Text>
      </BulletedListItem>
    </View>

    <Text color="medium" style={styles.paragraph}>
      <Text weight="medium">Personal Information We Collect About You.</Text>
      {' '}
      Under the CCPA, Personal Information refers to information that identifies, relates to,
      describes, is capable of being associated with, or could reasonably be linked, directly or
      indirectly, with you or your household. Below is a list of categories of Personal Information
      we collect about you:
    </Text>

    <View style={styles.listItems}>
      <BulletedListItem>
        <Text color="medium">
          <Text weight="medium">
            Identity Information
          </Text>
          {' '}
          such as first name, last name, driver’s license or state identification, passport number,
          or similar identifier.
        </Text>
      </BulletedListItem>

      <BulletedListItem>
        <Text color="medium">
          <Text weight="medium">
            Contact Information
          </Text>
          {' '}
          such as physical addresses, e-mail addresses, and phone numbers.
        </Text>
      </BulletedListItem>

      <BulletedListItem>
        <Text color="medium">
          <Text weight="medium">
            Education and Employment Information
          </Text>
          {' '}
          such as schools and colleges/universities attended, degrees earned,
          certifications and licenses, and other professional-related data.
        </Text>
      </BulletedListItem>

      <BulletedListItem>
        <Text color="medium">
          <Text weight="medium">
            Technical and Usage Information
          </Text>
          {' '}
          such as login data, Internet Protocol (IP) address, geolocation data, access dates
          and times,
          cookie data, browser activity, and other user interactions with our websites,
          applications,
          and platforms.
        </Text>
      </BulletedListItem>

      <BulletedListItem>
        <Text color="medium">
          <Text weight="medium">
            Marketing Information
          </Text>
          {' '}
          such as your preferences in receiving marketing materials and communications from us.
        </Text>
      </BulletedListItem>

      <BulletedListItem>
        <Text color="medium">
          <Text weight="medium">
            Profile Information
          </Text>
          {' '}
          such as your usernames and passwords, feedback, and survey responses.
        </Text>
      </BulletedListItem>

      <BulletedListItem>
        <Text color="medium">
          <Text weight="medium">
            Transaction Information
          </Text>
          {' '}
          such as details regarding products and services purchased from us.
        </Text>
      </BulletedListItem>

      <BulletedListItem>
        <Text color="medium">
          <Text weight="medium">
            Financial Information
          </Text>
          {' '}
          such as payment details, either directly collected by us or indirectly collected through a
          {' '}
          <Text underline>third party</Text>
          {' '}
          payment service provider.
        </Text>
      </BulletedListItem>

      <BulletedListItem>
        <Text color="medium">
          <Text weight="medium">
            Medical Information
          </Text>
          {' '}
          that is not governed under the Health Information Portability and
          Accountability Act (HIPAA)
          or the Confidentiality of Medication Information Act Part 2.6.
        </Text>
      </BulletedListItem>
    </View>

    <Text color="medium" style={styles.paragraph}>
      We also collect information that is not considered Personal Information under the CCPA.
      This includes publicly available information such as information lawfully made available
      from federal, state, or local government records. Protected or health information collected
      that is governed by HIPAA or the Confidentiality of Medical Information Act is not subject
      to the CCPA.
    </Text>

    <Text color="medium" style={styles.paragraph}>
      <Text weight="medium">Personal Information We Share with Third Parties.</Text>
      {' '}
      We disclose your Personal Information to
      third parties for business purposes. We require all third parties to respect the security
      of your Personal Information and to treat it in accordance with applicable law. Below is a
      list of categories of Personal Information we may share with third parties:
    </Text>

    <View style={styles.listItems}>
      <BulletedListItem>
        <Text color="medium">
          <Text weight="medium">
            Identity Information
          </Text>
          {' '}
          such as first name, last name, driver’s license or state identification, passport number,
          or similar identifier.
        </Text>
      </BulletedListItem>

      <BulletedListItem>
        <Text color="medium">
          <Text weight="medium">
            Contact Information
          </Text>
          {' '}
          such as physical addresses, e-mail addresses, and phone numbers.
        </Text>
      </BulletedListItem>

      <BulletedListItem>
        <Text color="medium">
          <Text weight="medium">
            Education and Employment Information
          </Text>
          {' '}
          such as schools and colleges/universities attended, degrees earned, certifications
          and licenses, and other professional-related data.
        </Text>
      </BulletedListItem>

      <BulletedListItem>
        <Text color="medium">
          <Text weight="medium">
            Marketing Information
          </Text>
          {' '}
          such as your preferences in receiving marketing materials and communications from us.
        </Text>
      </BulletedListItem>

      <BulletedListItem>
        <Text color="medium">
          <Text weight="medium">
            Profile Information
          </Text>
          {' '}
          such as your usernames and passwords, feedback, and survey responses.
        </Text>
      </BulletedListItem>

      <BulletedListItem>
        <Text color="medium">
          <Text weight="medium">
            Transaction Information
          </Text>
          {' '}
          such as details regarding products and services purchased from us.
        </Text>
      </BulletedListItem>

      <BulletedListItem>
        <Text color="medium">
          <Text weight="medium">
            Medical Information
          </Text>
          {' '}
          that is not governed under the Health Information Portability and Accountability Act
          (HIPAA) or Confidentiality of Medication Information Act Part 2.6.
        </Text>
      </BulletedListItem>
    </View>

    <Text color="medium" style={styles.paragraph}>
      <Text weight="medium">
        Personal Information We Sell to Third Parties.
      </Text>
      {' '}
      We do not sell your Personal Information to third parties.
      {'\n'}
      To more information, contact us via one of the following:
    </Text>

    <View style={styles.listItems}>
      <BulletedListItem>
        <Text color="medium">
          Toll-free telephone at
          {' '}
          <Text color="medium" onPress={() => Linking.openURL('tel:18662636512')}>
            1-866-263-6512
          </Text>
        </Text>
      </BulletedListItem>

      <BulletedListItem>
        <Text color="medium">
          JIRA Service Desk at
          {' '}
          <Text underline onPress={() => Linking.openURL('https://sdesk.drfirst.com/support')}>
            https://sdesk.drfirst.com/support
          </Text>
        </Text>
      </BulletedListItem>

      <BulletedListItem>
        <Text color="medium">
          Postal mail, at:
          {'\n'}
          DrFirst.com, Inc.
          {'\n'}
          9420 Key West Ave, Suite 101
          {'\n'}
          Rockville, MD 20850
          {'\n'}
          Attn: Legal Department – California Privacy Rights
        </Text>
      </BulletedListItem>
    </View>


    <Text color="medium" style={styles.paragraph}>
      All requests sent via postal mail must be labeled “California Privacy Rights” on the envelope
      or post card and clearly stated on the actual request. For all requests, please
      include your name, street address (if you would like a response via postal mail), city,
      state, and zip code. We are not responsible for notices that are not labeled or sent properly,
      or do not have complete information. We will respond to your request within forty-five (45)
      days, or within a timeframe otherwise permitted under the CCPA. You will not be required to
      pay a fee to access to your Personal Information. However, we may charge a reasonable fee if
      your request is unfounded, excessive, or repetitive.
    </Text>

    <Text.H4 style={styles.sectionItem}>
      How We Respond to Browser “Do Not Track” Signals
    </Text.H4>

    <Text color="medium" style={styles.paragraph}>
      Some web browsers incorporate a “Do Not Track” feature that signals to websites that you visit
      that you do not want to have your online activity tracked. How browsers communicate the
      Do Not Track signal is not uniform. For this reason, Huddle is not set up to interpret or
      respond to Do Not Track signals.
    </Text>

    <Text.H4 style={styles.sectionItem}>
      Children’s Online Privacy Protection Act (COPPA)
    </Text.H4>

    <Text color="medium" style={styles.paragraph}>
      Neither Huddle nor any services available through Huddle are directed to children under
      the age of 13. We do not knowingly collect Personal Information directly from children and
      will destroy such information if we become aware that a child has disclosed such information
      to us without proper parental consent. It is DrFirst’s policy not to knowingly solicit
      or permit children under the age of 13 to provide their Personal Information for any purpose.
    </Text>

    <Text.H4 style={styles.sectionItem}>
      Acceptance of and Changes to Privacy Policy
    </Text.H4>

    <Text color="medium" style={styles.paragraph}>
      By using Huddle, you are accepting the practices described in this Privacy Policy. We reserve
      the right to periodically modify this Privacy Policy. Any modified privacy policy will
      be posted in the Huddle application and be marked with an effective date. Your continued
      use of Huddle after the effective date of any modification means you accept and agree to be
      bound by the Privacy Policy as modified. Any material changes will generally apply only to
      activities and information collected after modification. We encourage you to review this
      Privacy Policy whenever you return to Huddle to make sure you are aware of the latest
      Privacy Policy.
    </Text>

    <Text.H4 style={styles.sectionItem}>
      Third Party Websites
    </Text.H4>

    <Text color="medium" style={styles.paragraph}>
      Huddle may contain links to and from websites maintained by other companies or organizations
      (“Third Party Websites”). We are not responsible for the privacy practices or the content of
      Third Party Websites. The information practices of Third Party Websites are not covered by
      this Privacy Policy.
    </Text>

    <Text.H4 style={styles.sectionItem}>
      Note to Non-U.S. Visitors
    </Text.H4>

    <Text color="medium" style={styles.paragraph}>
      This Privacy Policy is intended to meet the laws and regulations of the United States,
      which may not necessarily be consistent with the laws and regulations of your home country.
      Any information that you provide to
      {' '}
      <Text onPress={() => Linking.openURL('https://www.drfirst.com/')}>
        www.drfirst.com
      </Text>
      {' '}
      will be treated in accordance with this
      Privacy Policy, the Terms of Use, and U.S. laws.  Huddle is not intended for use outside of
      the United States of America.  Huddle is expressly not intended for use in the European Union
      or by any individual inside or resident of a European Union member state or any jurisdiction
      subject to the laws of the European Union.
    </Text>

    <Text color="medium" style={styles.paragraph}>
      Revision Date: 10/9/19
    </Text>
  </ScrollView>
);

export default PrivacyPolicy;
