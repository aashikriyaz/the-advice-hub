
import ProblemForm from "@/components/ProblemForm";

const SubmitPage = () => {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-advice-800 mb-4">Submit Your Problem</h1>
          <p className="text-gray-600">
            Share your challenge and receive thoughtful advice from our community. 
            You can submit anonymously or include your details for follow-up.
          </p>
        </div>
        
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm border">
          <ProblemForm />
        </div>
      </div>
    </div>
  );
};

export default SubmitPage;
