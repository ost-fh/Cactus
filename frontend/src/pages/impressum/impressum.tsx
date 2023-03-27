import Heading from "../../shared/components/heading";
import PublicLayout from "../../shared/layout/public-layout";

const Impressum = () => {
  return (
    <PublicLayout activeLink='impressum'>
      <header>
        <Heading>Impressum</Heading>
      </header>
      <h3>Contact</h3>
      <p>
        <strong>OST</strong>
        <br />
        <strong>Ostschweizer Fachhochschule</strong>
      </p>
      <p>
        Oberseestrasse 10
        <br /> CH-8640 Rapperswil
      </p>
      <p>
        <a href='+41 58 257 41 11'>+41 58 257 41 11</a>
        <br />
        <a href='mailto:info@ost.ch?subject=Project Cactus'>info@ost.ch</a>
      </p>
      <h3>Legal form</h3>
      <p>
        Institution under public law pursuant to the agreement on the OST –
        Eastern Switzerland University of Applied Sciences of 15 February 2019.
      </p>
      <h3>Contact for technical and content-related matters</h3>
      <p>
        <strong>OST</strong>
        <br />
        <strong>Ostschweizer Fachhochschule</strong>
        <br />
        <a href="https://www.ost.ch/de/forschung-und-dienstleistungen/informatik/ifs-institut-fuer-software">IFS Institute for Software</a>
        <br />
        Oberseestrasse 10
        <br />
        8640 Rapperswil
        <br />
      </p>
      <p>
        <a href='+41 58 257 46 63'>+41 58 257 46 63</a>
        <br />
        <a href='mailto:markus.stolze@ost.ch?subject=Project Cactus'>
          markus.stolze@ost.ch
        </a>
      </p>
      <h3>Exclusion of liability</h3>
      <p>
        OST – Eastern Switzerland University of Applied Sciences makes every
        effort to publish the content on this website as up-to-date and accurate
        as possible. Nevertheless, we cannot guarantee the topicality,
        correctness, completeness and quality of the published information. OST
        – Eastern Switzerland University of Applied Sciences is therefore not
        liable for any material or immaterial damage arising from or in
        connection with the use, non-use or misuse of the information provided
        or from the use of incorrect or incomplete information. All content on
        this website is information, not advice or recommendations. In addition,
        the university reserves the right to change, delete or temporarily not
        publish content without prior notice.
      </p>
      <h3>Exclusion of liability for links</h3>
      <p>
        References and links to third-party websites are outside our area of
        responsibility. We decline all responsibility for such websites. Access
        to and use of such websites is at the user's own risk.
      </p>
      <h3>Copyright</h3>
      <p>
        OST – Eastern Switzerland University of Applied Sciences copyrighted
        content (texts, images, videos, etc.) and structure of this website. No
        rights are transferrable by downloading or copying the content.
        Reproduction in whole or in part, transmission by electronic or other
        means, modification or use for public or commercial purposes without the
        prior written consent of OST – Eastern Switzerland University of Applied
        Sciences is prohibited.
      </p>
    </PublicLayout>
  );
};

export default Impressum;
