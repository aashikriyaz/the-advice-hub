
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getAllProblems } from "@/lib/mock-data";
import { useEffect, useState } from "react";
import { Problem } from "@/types/problem";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const HomePage = () => {
  const [recentProblems, setRecentProblems] = useState<Problem[]>([]);
  
  useEffect(() => {
    // Get the 3 most recent problems
    const problems = getAllProblems()
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 3);
    
    setRecentProblems(problems);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  return (
    <div className="animate-fade-in">
      {/* Hero section */}
      <section className="bg-gradient-to-b from-advice-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-advice-900 mb-4">
              Share Your Problems, Get Practical Advice
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Welcome to Advice Hub, where you can anonymously share your challenges and receive guidance from experts and peers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/submit">
                <Button size="lg" className="bg-advice-600 hover:bg-advice-700">
                  Submit Your Problem
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" size="lg">
                  Browse Advice
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center text-advice-800 mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-advice-50 p-6 rounded-lg text-center">
              <div className="w-12 h-12 bg-advice-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-advice-800">Submit Your Problem</h3>
              <p className="text-gray-600">
                Share your challenge anonymously or with your details if you want follow-up.
              </p>
            </div>
            <div className="bg-advice-50 p-6 rounded-lg text-center">
              <div className="w-12 h-12 bg-advice-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-advice-800">Our Team Reviews</h3>
              <p className="text-gray-600">
                Our team of experts reviews your submission and prepares thoughtful advice.
              </p>
            </div>
            <div className="bg-advice-50 p-6 rounded-lg text-center">
              <div className="w-12 h-12 bg-advice-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-advice-800">Receive Guidance</h3>
              <p className="text-gray-600">
                Get practical solutions to your problem that you can implement right away.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent problems section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center text-advice-800 mb-12">Recent Problems</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentProblems.map((problem) => (
              <Card key={problem.id} className="h-full flex flex-col hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <Badge className="bg-advice-100 text-advice-800 hover:bg-advice-200">{problem.category}</Badge>
                  </div>
                  <CardTitle className="text-xl mt-2">{problem.title}</CardTitle>
                  <CardDescription>{formatDate(problem.createdAt)}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gray-600 line-clamp-3">
                    {problem.description}
                  </p>
                </CardContent>
                <CardFooter className="pt-4 border-t">
                  <div className="w-full flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {problem.isAnonymous ? "Anonymous" : problem.name}
                    </span>
                    <Button variant="ghost" className="text-advice-600 hover:text-advice-800 hover:bg-advice-50">
                      Read More
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/">
              <Button variant="outline" size="lg">
                View All Problems
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-16 md:py-20 bg-advice-600 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Share Your Problem?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-advice-50">
            Join thousands of people who have found solutions to their challenges through our platform.
          </p>
          <Link to="/submit">
            <Button size="lg" variant="outline" className="bg-white text-advice-600 hover:bg-advice-50">
              Submit Your Problem Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
