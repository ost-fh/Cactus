import Heading from "../../shared/components/heading";
import PublicLayout from "../../shared/layout/public-layout";

const Impressum = () => {
  return (
    <PublicLayout activeLink='impressum'>
      <header>
        <Heading>Impressung</Heading>
      </header>
      <h3>Privacy</h3>

      <p>https://www.ost.ch/en/systemseiten/privacy-policy</p>

      <h3>Others</h3>
      <p>blabla seite der ost</p>
      <p>
        betrieb durch
        https://www.ost.ch/de/forschung-und-dienstleistungen/informatik/ifs-institut-fuer-software
      </p>
      <p>https://www.ost.ch/en/systemseiten/legal-notice</p>
    </PublicLayout>
  );
};

export default Impressum;
