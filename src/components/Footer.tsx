
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t mt-auto py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4 text-advice-800">About Advice Hub</h3>
            <p className="text-gray-600">
              A platform where you can anonymously submit your problems and get advice from the community.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4 text-advice-800">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-advice-600 transition-colors">Home</Link></li>
              <li><Link to="/submit" className="text-gray-600 hover:text-advice-600 transition-colors">Submit Problem</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4 text-advice-800">Contact</h3>
            <p className="text-gray-600">
              Have questions or suggestions? Contact us at <a href="mailto:contact@advicehub.com" className="text-advice-600 hover:underline">contact@advicehub.com</a>
            </p>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center text-gray-600">
          <p>&copy; {currentYear} Advice Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
