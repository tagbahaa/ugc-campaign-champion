import Navbar from "../components/Navbar";

const NewCampaign = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6">Create New Campaign</h1>

        <div className="vairu-card p-8 text-center">
          <p className="text-vairu-muted mb-4">
            This page is under construction. You'll be able to create new
            campaigns here soon.
          </p>
          <a href="/" className="vairu-button-primary inline-block">
            Back to Dashboard
          </a>
        </div>
      </main>
    </div>
  );
};

export default NewCampaign;
