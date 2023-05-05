import { Link } from "react-router-dom";
import Heading from "../../shared/components/heading";
import PublicLayout from "../../shared/layout/public-layout";
import "./accessibility-statement.css";

const AccessibilityStatement = () => {
  return (
    <PublicLayout activeLink='accessibility-statement'>
      <header>
        <Heading>Accessibility Statement</Heading>
      </header>
      <p>
        On this website, the main goal is to provide a comprehensive comparison
        of different UI libraries based on their accessibility support. We
        believe that accessibility is a fundamental aspect of creating an
        inclusive online experience, and we strive to make this website as
        accessible as possible.
      </p>
      <h3>Measuring Accessibility with the Cactus Score</h3>
      <p>
        We use the Cactus Score to evaluate the accessibility of UI libraries
        featured on this website. The Cactus Score is a comprehensive assessment
        of accessibility, covering a wide range of criteria such as keyboard
        accessibility and screen reader compatibility. We use this score to help
        users identify the most accessible UI libraries for their needs.
      </p>
      <h3>Accessibility Features of this Website</h3>
      <p>
        The project cactus is committed to ensuring that this website is
        accessible to people with disabilities. We strive to meet the Web
        Content Accessibility Guidelines (WCAG) 2.1 level AA standards as
        recommended by the World Wide Web Consortium (W3C).
      </p>
      <p>
        Our website is designed to be compatible with a wide range of web
        browsers, including Google Chrome, Mozilla Firefox, Microsoft Edge, and
        Apple Safari. We have also tested our website to ensure compatibility
        with the popular screen reader NVDA.
      </p>
      <p>
        In addition to providing information on accessible UI libraries, this
        website includes several accessibility features to make it easy for all
        users to navigate and use this site. These features include:
      </p>
      <ul className='disc-list'>
        <li>Keyboard accessibility for all features and functions </li>
        <li>Clear and concise language to make content easy to understand</li>
        <li>
          High contrast color schemes to improve visibility for users with low
          vision
        </li>
        <li>
          Alternative text descriptions for images and other visual content
        </li>
        <li>
          Consistent layout and navigation to help users find what they need
          quickly and easily
        </li>
      </ul>
      <h3>Contact Us</h3>
      <p>
        We recognize that there may be some limitations to accessibility on this
        website, and we are actively working to address these issues. If you
        encounter any problems using this website or have any suggestions for
        how we can improve accessibility, please contact the community behind
        this project at{" "}
        <a href='https://github.com/ost-fh/Cactus/issues'>GitHub Issues</a> or
        use the contact information provided on the{" "}
        <Link to='/impressum'>Impressum page</Link>. We are committed to making
        our website as accessible as possible for all users.
      </p>
      <p>
        This accessibility statement is subject to periodic review and will be
        updated as necessary to reflect any changes in our policies or
        practices.
      </p>
    </PublicLayout>
  );
};

export default AccessibilityStatement;
