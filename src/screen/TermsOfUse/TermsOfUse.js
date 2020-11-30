import React from 'react';
import { ScrollView, Linking, View } from 'react-native';

import Text from '/component/Text';
import BulletedListItem from '/component/BulletedListItem';
import styles from './styles';

const TermsOfUse = () => (
  <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.content}>
    <Text.H1 style={styles.title}>Terms of use</Text.H1>

    <Text.H4 style={styles.sectionItem}>ACCEPTABLE USE</Text.H4>
    <Text color="medium" style={styles.paragraph}>
      These Terms of Service (“Terms”) apply to Your use of the Huddle Application (“Huddle”).
      DrFirst grants You, the user, a limited, non-exclusive, non-transferrable right to use Huddle
      and the features, content or applications offered in connection with the application solely
      for Yourself and within the United States of America, and for no other purpose or in any other
      location. By using the Site, You agree to comply with and to be bound by these Terms, and the
      terms of the Huddle Privacy Policy. If You disagree with these Terms and/or the Privacy
      Policy, or do not agree to be bound by them, You are not authorized to use or access Huddle.
    </Text>

    <Text.H4 style={styles.sectionItem}>INTELLECTUAL PROPERTY</Text.H4>
    <Text color="medium" style={styles.paragraph}>
      All intellectual property, materials, works, software, code and other functions accessible
      through Huddle, including, but not limited to, text, graphics, images, illustrations, designs,
      icons, photographs, video clips, and written and other materials that appear as part of the
      Site, as well as their selection and arrangement and look and feel (collectively, the
      “Content”) are protected by copyright, trademark, patent, and/or other intellectual property
      laws and are the sole and exclusive property of DrFirst. Any unauthorized use of the Content
      may violate such laws and is in violation of these Terms. Except as expressly provided in
      these Terms, DrFirst does not grant You any express or implied rights to use the Content. You
      agree not to copy, reproduce, republish, frame, download, transmit, modify, display, reverse
      engineer, create derivative works based on Huddle, the Content or their selection and
      arrangement, sell, or participate in any sale of, rent, lease, loan, assign, distribute,
      license, sublicense, or exploit in any way, in whole or in part, any of the Content, Huddle or
      any related software, services, or applications.
    </Text>

    <Text.H4 style={styles.sectionItem}>CONSENT TO USE INFORMATION FOR THE SERVICES</Text.H4>
    <Text color="medium" style={styles.paragraph}>
      Huddle may use your information to make available the features and functions of the
      application as well as provide to you other materials, information and services provided by
      DrFirst or DrFirst partners (collectively, the “DrFirst Services”). You expressly authorize
      DrFirst to use and disclose the information you provide to DrFirst as necessary to provide any
      DrFirst Services. Further, Huddle may include features which require your authorization or
      consent, and upon initiating the request through the applicable feature, you expressly
      acknowledge your consent to transmit the information for the intended purpose. In the event
      you choose to use Huddle to share Your information with a third party, or authorize a third
      party to access your information, You expressly authorize DrFirst to transmit or otherwise
      make the information available to that third-party, including but not limited to, sensitive
      health data.
    </Text>

    <Text.H4 style={styles.sectionItem}>YOUR RELATIONSHIP WITH DRFIRST</Text.H4>
    <Text color="medium" style={styles.paragraph}>
      You acknowledge and agree that:
    </Text>
    <View style={styles.listItems}>
      <BulletedListItem>
        <Text color="medium">
          You are choosing to use the Huddle product to store your healthcare information, and by
          entering these Terms are creating a distinct relationship solely and directly between You
          and DrFirst;
        </Text>
      </BulletedListItem>
      <BulletedListItem>
        <Text color="medium">
          You have chosen to use the features of Huddle of your own volition, and any storing or
          sharing of information is a decision solely by you;
        </Text>
      </BulletedListItem>
      <BulletedListItem>
        <Text color="medium">
          Your relationship with DrFirst is not related to any healthcare treatment or other
          relationship you may have with a physician, insurance company, or other provider of
          healthcare services; and
        </Text>
      </BulletedListItem>

      <BulletedListItem>
        <Text color="medium">
          the Health Insurance Portability and Accountability Act of 1996 (HIPAA) and its
          implementing regulations do not apply to Your relationship with DrFirst, that DrFirst is
          not acting as a Business Associate or Covered Entity as those terms are defined by HIPAA,
          that the health information you provide to DrFirst is not protected health information
          (PHI) as defined by HIPAA, and that once in DrFirst’s possession, other federal and state
          privacy laws may not apply to your healthcare information.
        </Text>
      </BulletedListItem>
    </View>

    <Text.H4 style={styles.sectionItem}>CONSENT TO CONTACT</Text.H4>
    <Text color="medium" style={styles.paragraph}>
      By agreeing to these Terms, you hereby expressly consent to DrFirst using your contact
      information and other information associated with your account, including, but not limited to
      your mobile number, to communicate with you regarding your information and use of the Huddle
      application, as well as provide you with other coupon or benefit information. You expressly
      permit DrFirst to send such communications to your mobile phone or other device using SMS text
      messages. You expressly agree that standard data fees and text messaging rates may apply based
      on your plan with your mobile phone carrier. As mobile access and text message delivery is
      subject to your mobile carrier network availability, such access and delivery is not
      guaranteed. You may opt out of text delivery at any time by following instructions in the text
      message, or through the JIRA services desk at
      {' '}
      <Text
        underline
        onPress={() => Linking.openURL('https://sdesk.drfirst.com/support')}
      >
        https://sdesk.drfirst.com/support
      </Text>
      .
    </Text>

    <Text.H4 style={styles.sectionItem}>THIRD PARTY CONTENT</Text.H4>
    <Text color="medium" style={styles.paragraph}>
      Huddle may make available materials, information, data, and services provided by third
      parties, including, but not limited to photographs, text, graphics, pictures, sound, video,
      educational content, drug pricing information, coupon information, general information,
      healthcare data, and/or software applications (Third-Party Content). The Third-Party Content
      may be governed by separate license agreements that accompany such content. DrFirst does not
      investigate, monitor or check for accuracy, appropriateness, or completeness of Third Party
      Content. DrFirst offers no guarantees and assumes no responsibility or liability of any type
      with respect to the Third-Party Content, including any liability resulting from
      incompatibility between the Third Party Content and the Content offered by DrFirst. You agree
      to receive any Third-Party Content associated with a feature You use.
    </Text>
    <Text color="medium" style={styles.paragraph}>
      DrFirst is not responsible for any third-party websites or applications accessed through
      Huddle, and You should review the applicable terms of services and any other policies of any
      website to which You navigate. If You decide to access third party websites or content, You do
      so at Your own risk and You should are hereby advised that our Terms do not govern such
      access. To the extent Huddle includes links to outside services and resources, You acknowledge
      that DrFirst is not responsible for the content of any linked site or any link contained in a
      linked site, or any changes or updates to such sites. DrFirst provides these links to You only
      as a convenience, and the inclusion of any link does not imply approval or endorsement by
      DrFirst. DrFirst is not responsible or liable, directly or indirectly, for any damage, loss or
      liability caused or alleged to be caused by or in connection with any use of or reliance on
      any such content, products or services available on or through any such linked site or
      resource. Any issues or concerns regarding any such site should be directed to the owner or
      operator of that application or site.
    </Text>

    <Text.H4 style={styles.sectionItem}>DATA YOU PROVIDE</Text.H4>
    <Text color="medium" style={styles.paragraph}>
      You represent and warrant that you have all rights, permissions, and authority under
      applicable state, federal, and local law to provide to DrFirst any information stored, used,
      uploaded, transferred, or otherwise provided by You to the Huddle application. Further, and
      without limitation, if You are using Huddle to manage the information of a third party, you
      represent and warrant that you have all necessary permissions required under applicable from
      that third party, and that, as applicable, you are a guardian, personal representative, or
      other authorized steward of such information, and, as applicable, that any such third parties
      have authorized your sharing of their information to DrFirst or other third parties through
      Huddle. DrFirst reserves the right to eliminate your access to Huddle if DrFirst discovers at
      any time that the representations and warranties in this section are or have become, in whole
      or in part, false or otherwise inaccurate.
    </Text>

    <Text.H4 style={styles.sectionItem}>CONSENT TO USE INFORMATION</Text.H4>
    <Text color="medium" style={styles.paragraph}>
      You authorize DrFirst to use the information You provide to tell You about,
      cost savings, clinical trial, and other services that may be available.
      Additionally, DrFirst may use the data that You provide for purposes of
      product analysis and improvement.  DrFirst may receive remuneration from
      third parties in connection with these activities.
    </Text>

    <Text.H4 style={styles.sectionItem}>PROHIBITED USE</Text.H4>
    <Text color="medium" style={styles.paragraph}>
      DrFirst strictly prohibits the following and You agree not to engage in:
    </Text>

    <View style={styles.listItems}>
      <BulletedListItem>
        <Text color="medium">
          Any downloading, copying or other use of the Content or Huddle for purposes competitive to
          DrFirst or for the benefit of another vendor or any third party;
        </Text>
      </BulletedListItem>

      <BulletedListItem>
        <Text color="medium">
          Any caching, unauthorized linking to Huddle or the framing of any Content available;
        </Text>
      </BulletedListItem>

      <BulletedListItem>
        <Text color="medium">
          Any modification, distribution, transmission, performance, broadcast, publication,
          uploading, licensing, reverse engineering, transfer or sale of, or the creation of
          derivative works from, any Content, products or services obtained from Huddle that You do
          not have express authorization to make available;
        </Text>
      </BulletedListItem>

      <BulletedListItem>
        <Text color="medium">
          Any uploading, posting or transmitting of any material that contains software viruses or
          any other computer code, files or programs designed to interrupt, destroy or limit the
          functionality of any computer;
        </Text>
      </BulletedListItem>

      <BulletedListItem>
        <Text color="medium">
          Using any hardware or software intended to surreptitiously intercept or otherwise obtain
          any information (such as system data or personal information) from Huddle.
        </Text>
      </BulletedListItem>

      <BulletedListItem>
        <Text color="medium">
          Any action that imposes or may impose (in DrFirst’s sole discretion) an unreasonable or
          disproportionately large load on DrFirst’s infrastructure, or damage or interfere with the
          proper working of DrFirst’s infrastructure;
        </Text>
      </BulletedListItem>

      <BulletedListItem>
        <Text color="medium">
          Any action intended to disable, bypass, defeat, avoid, remove, deactivate or otherwise
          circumvent any technical measures we have implemented to safeguard the stability of
          Huddle, or the confidentiality, integrity or availability of any information, content or
          data hosted or housed on our services;
        </Text>
      </BulletedListItem>
    </View>

    <Text color="medium" style={styles.paragraph}>
      You are responsible for obtaining access to Huddle, and any applicable fees including but not
      limited to Internet service provider or airtime charges. In addition, You must provide and are
      responsible for all equipment necessary to access Huddle. You may not bypass any measures that
      have been implemented to prevent or restrict access to Huddle. Any unauthorized access to
      Huddle by You (including any such access or use that involves in any way an account You may
      establish on Huddle or any device You may use to access it) shall terminate the permission or
      license granted to You by DrFirst.
    </Text>
    <Text color="medium" style={styles.paragraph}>
      DrFirst reserves the right to refuse or cancel any person’s registration to access Huddle,
      remove any person from Huddle and prohibit any person from using Huddle for any reason
      whatsoever, and to limit or terminate Your access to or use of Huddle at any time without
      notice. DrFirst does not warrants nor represents that Your use of the Content available on
      Huddle will not infringe rights of third parties not affiliated with DrFirst. Termination of
      Your access or use will not waive or affect any other right or relief to which DrFirst may be
      entitled, at law or in equity.
    </Text>

    <Text.H4 style={styles.sectionItem}>NO MEDICAL OR LEGAL ADVICE</Text.H4>
    <Text color="medium" style={styles.paragraph}>
      The Content that You obtain or receive from Huddle is for informational purposes only. DrFirst
      does not provide legal, regulatory, or medical advice of any kind and no attorney/client or
      physician/patient relationship is created by Your use of Huddle. DrFirst does not ensure the
      completeness, timeliness or accuracy of the Content. No Content or other information on Huddle
      is a substitute for professional medical or legal advice.
    </Text>
    <Text color="medium" style={styles.paragraph}>
      You may be able to access electronic medical record or associated health care information
      through Huddle. If you are seeking a full copy of your electronic medical record, you must
      contact your health care provider directly. In the event You print, download, or otherwise
      store any portion of the Content presented in Huddle, which may contain your private health
      information, DrFirst is not responsible for the protection or the privacy and security of such
      information, and completely disclaim all liability from any further use and/or disclosure of
      your private health information associated with such saved content.
    </Text>
    <Text color="medium" style={styles.paragraph}>
      If you are experiencing a medical emergency or any event requiring prompt medical treatment,
      do not use Huddle to seek care or to contact a health care professional. Immediately seek
      professional medical care or dial 9-1-1.
    </Text>

    <Text.H4 style={styles.sectionItem}>DISCLAIMERS AND WAIVER</Text.H4>
    <Text color="medium" style={styles.paragraph}>
      EXCEPT AS OTHERWISE EXPRESSLY PROVIDED IN THESE TERMS OF SERVICE, OR REQUIRED BY APPLICABLE
      LAW, DRFIRST MAKES NO REPRESENTATIONS, COVENANTS OR WARRANTIES AND OFFERS NO OTHER CONDITIONS,
      EXPRESS OR IMPLIED, REGARDING ANY MATTER RELATED TO YOUR USE OF HUDDLE. YOUR USE OF HUDDLE IS
      AT YOUR SOLE RISK. HUDDLE IS PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS. WE RESERVE THE
      RIGHT TO RESTRICT OR TERMINATE YOUR ACCESS TO HUDDLE OR ANY FEATURE OR PART THEREOF AT ANY
      TIME. DRFIRST DISCLAIMS ANY WARRANTIES TO YOU THAT ACCESS TO HUDDLE WILL BE UNINTERRUPTED OR
      ERROR-FREE; THAT HUDDLE WILL BE SECURE, EXCEPT AS MAY BE REQUIRED BY APPLICABLE LAW; THAT
      HUDDLE OR THE SERVER THAT MAKES HUDDLE AVAILABLE WILL BE VIRUS-FREE; OR THAT INFORMATION OR
      CONTENT ON HUDDLE WILL BE CORRECT, ACCURATE, ADEQUATE, USEFUL, TIMELY, RELIABLE OR OTHERWISE
      COMPLETE (INCLUDING, BUT NOT LIMITED TO, DRUG INTERACTION INFORMATION AND PRICING
      INFORMATION). YOU AGREE THAT DRFIRST WILL NOT BE HELD LIABLE FOR YOUR USE OF THE CONTENT
      PROVIDED THROUGH HUDDLE, DATA ACCESSIBLE THEREFROM, OR ANY DECISION MADE USING THE CONTENT
      AVAILABLE THROUGH HUDDLE. IF YOU DOWNLOAD ANY CONTENT FROM HUDDLE, YOU DO SO AT YOUR OWN
      DISCRETION AND RISK. YOU WILL BE SOLELY RESPONSIBLE FOR ANY DAMAGE TO YOUR COMPUTER SYSTEM OR
      LOSS OF DATA THAT RESULTS FROM THE DOWNLOAD OF ANY SUCH CONTENT. NO ADVICE OR INFORMATION
      OBTAINED BY YOU FROM HUDDLE SHALL CREATE ANY WARRANTY OF ANY KIND. YOUR SOLE REMEDY AGAINST
      DRFIRST FOR DISSATISFACTION WITH HUDDLE IS TO STOP USING THE SITE. YOU HEREBY RELEASE AND
      FOREVER WAIVE ANY AND ALL CLAIMS YOU MAY HAVE AGAINST DRFIRST, ITS OFFICERS, DIRECTORS,
      EMPLOYEES, AGENTS, INFORMATION PROVIDERS OR SUPPLIERS FOR LOSSES OR DAMAGES YOU SUSTAIN IN
      CONNECTION WITH YOUR USE OF HUDDLE, OR ARISING UNDER THE TELEPHONE CONSUMER PROTECTION ACT OR
      SIMILAR STATE LAW OR REGULATION RELATED TO RECEIVING CALLS OR TEXT MESSAGES TO WHICH YOU HAVE
      CONSENTED, INCLUDING, BUT NOT LIMITED TO, BY AGREEING TO THESE TERMS.
    </Text>

    <Text.H4 style={styles.sectionItem}>INDEMNITY</Text.H4>
    <Text color="medium" style={styles.paragraph}>
      You will indemnify and hold harmless DrFirst from and against any and all fines, penalties,
      liabilities, losses and other damages of any kind whatsoever (including attorneys and experts
      fees), incurred by DrFirst, and shall defend DrFirst against any and all claims arising out of
      (a) Your breach of the Terms; (b) fraud You commit, or Your intentional misconduct or
      negligence; or (c) Your violation of any applicable state, federal, local, or foreign law or
      the rights of a third party. DrFirst will control the defense of any claim to which this
      indemnity may apply, and in any event, You shall not settle any claim without the prior
      written approval of DrFirst.
    </Text>

    <Text.H4 style={styles.sectionItem}>DISPUTES</Text.H4>
    <Text color="medium" style={styles.paragraph}>
      If any of the provisions set forth in these Terms are deemed invalid, void, or for any reason
      unenforceable, the parties agree that the court should endeavor to give effect to the parties’
      intentions as reflected in the provision, and the unenforceable condition shall be deemed
      severable and shall not affect the validity and enforceability of any remaining provisions of
      these Terms. Section headings are for reference purposes only and do not limit the scope or
      extent of such section. These Terms and the relationship between You and DrFirst will be
      governed by the laws of the State of Maryland without regard to its conflict of law
      provisions. Any dispute arising out of these Terms or Your use of the Site shall be subject to
      the exclusive jurisdiction and venue of courts in the State of Maryland. This agreement is not
      subject to the Uniform Computer Information Transactions Act.
    </Text>
    <Text color="medium" style={styles.paragraph}>
      DrFirst makes no representation that information, software and/or documentation on Huddle are
      available for viewing or downloading at locations outside the United States, nor that the Site
      complies with any foreign laws and You are prohibited from accessing Huddle outside of the
      United States. Huddle is expressly not intended for use in the European Union or by any
      individual inside or resident of a European Union member state or any jurisdiction subject to
      the laws of the European Union.
    </Text>

    <Text.H4 style={styles.sectionItem}>MODIFICATION TO TERMS OF SERVICE</Text.H4>
    <Text color="medium" style={styles.paragraph}>
      You acknowledge and agree that DrFirst may, in its sole discretion, modify, add or remove any
      portion of these Terms of Service at any time and in any manner, by posting revised Terms.. It
      is Your responsibility to check periodically for any changes DrFirst makes to the Terms. Your
      continued use of Huddle after any changes to the Terms means You accept the modifications.
    </Text>

    <Text.H4 style={styles.sectionItem}>ENTIRE AGREEMENT</Text.H4>
    <Text color="medium" style={styles.paragraph}>
      These Terms constitute the entire agreement and understanding between You and DrFirst with
      respect to Your use and access of Huddle and supersede all prior communications between the
      parties with respect to such subject matter.
    </Text>

    <Text color="medium" style={styles.paragraph}>
      Revised 12/4/19
    </Text>
  </ScrollView>
);

export default TermsOfUse;
