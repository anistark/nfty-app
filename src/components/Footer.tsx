import { Link } from "react-router-dom";
import { X, Linkedin, Instagram } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="glass mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">NFTy 50</h3>
            <p className="text-sm text-muted-foreground">
              Make Smarter Investments with Top NFT Index Funds
            </p>
            <p className="text-sm text-muted-foreground mt-8">
              NOTE: This product is still under development. Do NOT use mainnet
              funds.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-primary transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/synth-token" className="text-sm hover:text-primary transition-colors">$PUNK</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Email: support@dripverse.org
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://x.com/nfty50"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <X className="h-5 w-5" />
                </a>
                {/* <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a> */}
                {/* <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};