const Footer = () => {
  return (
    <footer className="border-t bg-card">
      <div className="container py-6 text-center text-sm text-muted-foreground">
        <p>Demo for Redington — Not a production app</p>
        <p className="mt-1">© {new Date().getFullYear()} RiskSense. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
