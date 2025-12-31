import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart, TrendingUp, Users, DollarSign,IndianRupee, Target, Zap } from 'lucide-react';

const PitchDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "eshushopCart",
      subtitle: "Revolutionizing Online Grocery Shopping",
      content: (
        <div className="text-center space-y-6">
          <ShoppingCart className="w-24 h-24 mx-auto text-green-600" />
          <p className="text-2xl text-gray-700">Fresh groceries delivered to your doorstep in under 2 hours</p>
          <div className="flex justify-center gap-4 text-sm text-gray-600">
            <span>📍 Urban Markets</span>
            <span>⚡ Fast Delivery</span>
            <span>🌱 Quality Guaranteed</span>
          </div>
        </div>
      )
    },
    {
      title: "The Problem",
      subtitle: "Modern consumers face significant grocery shopping challenges",
      content: (
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-red-50 p-6 rounded-lg">
            <h3 className="font-bold text-lg mb-3 text-red-900">Time Constraints</h3>
            <p className="text-gray-700">Average family spends 2-3 hours per week shopping for groceries, time that could be better spent</p>
          </div>
          <div className="bg-red-50 p-6 rounded-lg">
            <h3 className="font-bold text-lg mb-3 text-red-900">Limited Selection</h3>
            <p className="text-gray-700">Physical stores constrained by shelf space, missing specialty and organic options</p>
          </div>
          <div className="bg-red-50 p-6 rounded-lg">
            <h3 className="font-bold text-lg mb-3 text-red-900">Impulse Buying</h3>
            <p className="text-gray-700">In-store shopping leads to 23% overspending on unplanned purchases</p>
          </div>
          <div className="bg-red-50 p-6 rounded-lg">
            <h3 className="font-bold text-lg mb-3 text-red-900">Inconsistent Quality</h3>
            <p className="text-gray-700">No control over product freshness and quality selection</p>
          </div>
        </div>
      )
    },
    {
      title: "Our Solution",
      subtitle: "A seamless digital grocery experience",
      content: (
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <Zap className="w-8 h-8 text-green-600 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg mb-2">Ultra-Fast Delivery</h3>
              <p className="text-gray-700">2-hour delivery windows with real-time tracking and SMS updates</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Target className="w-8 h-8 text-green-600 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg mb-2">Smart Recommendations</h3>
              <p className="text-gray-700">AI-powered suggestions based on purchase history and dietary preferences</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <ShoppingCart className="w-8 h-8 text-green-600 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg mb-2">Quality Guarantee</h3>
              <p className="text-gray-700">Hand-picked produce, 100% freshness guarantee or full refund</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Users className="w-8 h-8 text-green-600 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg mb-2">Subscription Model</h3>
              <p className="text-gray-700">Premium membership with free delivery, exclusive deals, and priority slots</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Market Opportunity",
      subtitle: "Massive and growing addressable market",
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
            <h3 className="font-bold text-2xl mb-2 text-gray-800">22Lakhs crore + Total Addressable Market</h3>
            <p className="text-gray-700">India online grocery market projected by 2026</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded-lg shadow">
              <p className="text-3xl font-bold text-green-600 mb-1">21%</p>
              <p className="text-sm text-gray-600">CAGR Growth Rate</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow">
              <p className="text-3xl font-bold text-green-600 mb-1">45%</p>
              <p className="text-sm text-gray-600">Households Online</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow">
              <p className="text-3xl font-bold text-green-600 mb-1">8550</p>
              <p className="text-sm text-gray-600">Avg Order Value</p>
            </div>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="font-bold mb-3">Key Market Drivers</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• Post-pandemic shift to online shopping habits</li>
              <li>• Growing demand for convenience among millennials and Gen Z</li>
              <li>• Expansion of quick-commerce infrastructure</li>
              <li>• Rising smartphone and internet penetration</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Business Model",
      subtitle: "Multiple revenue streams for sustainable growth",
      content: (
        <div className="space-y-4">
          <div className="bg-green-50 p-5 rounded-lg border-l-4 border-green-600">
            <h3 className="font-bold text-lg mb-2">Product Sales (70%)</h3>
            <p className="text-gray-700">15-25% margin on groceries, fresh produce, and household essentials</p>
          </div>
          <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-600">
            <h3 className="font-bold text-lg mb-2">Subscription Revenue (15%)</h3>
            <p className="text-gray-700">8910/year premium membership: free delivery + exclusive discounts+All festival pack worth 8910</p>
          </div>
          <div className="bg-purple-50 p-5 rounded-lg border-l-4 border-purple-600">
            <h3 className="font-bold text-lg mb-2">Delivery Fees (10%)</h3>
            <p className="text-gray-700">Rs449-Rs899 per order for non-subscribers based on order size</p>
          </div>
          <div className="bg-orange-50 p-5 rounded-lg border-l-4 border-orange-600">
            <h3 className="font-bold text-lg mb-2">Vendor Partnerships (5%)</h3>
            <p className="text-gray-700">Featured placement fees and promotional partnerships with brands</p>
          </div>
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <p className="text-center font-semibold text-gray-800">Unit Economics: 1080 profit per order at scale</p>
          </div>
        </div>
      )
    },
    {
      title: "Competitive Advantage",
      subtitle: "What sets us apart from competitors",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-5 rounded-lg text-white">
              <h3 className="font-bold text-lg mb-2">Hyper-Local Fulfillment</h3>
              <p className="text-sm">Micro-warehouses in neighborhoods enable 2-hour delivery vs 4-6 hour competitors</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-5 rounded-lg text-white">
              <h3 className="font-bold text-lg mb-2">AI-Powered Ops</h3>
              <p className="text-sm">Machine learning optimizes inventory, reduces waste by 40%, predicts demand patterns</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-5 rounded-lg text-white">
              <h3 className="font-bold text-lg mb-2">Quality Control</h3>
              <p className="text-sm">Trained staff hand-pick every item, freshness scored and guaranteed</p>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-5 rounded-lg text-white">
              <h3 className="font-bold text-lg mb-2">Strategic Partnerships</h3>
              <p className="text-sm">Exclusive deals with local farms and specialty suppliers</p>
            </div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <p className="text-center font-semibold text-gray-800">💡 Our NPS score: 72 (vs industry average of 45)</p>
          </div>
        </div>
      )
    },
    {
      title: "Traction & Metrics",
      subtitle: "Strong early momentum and growth",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-100 rounded-lg">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-700" />
              <p className="text-2xl font-bold text-green-700">50K+</p>
              <p className="text-sm text-gray-600">Active Users</p>
            </div>
            <div className="text-center p-4 bg-blue-100 rounded-lg">
              <IndianRupee className="w-8 h-8 mx-auto mb-2 text-blue-700" />
              <p className="text-2xl font-bold text-blue-700">22 crore</p>
              <p className="text-sm text-gray-600">Monthly Gross Merchandise Value</p>
            </div>
            <div className="text-center p-4 bg-purple-100 rounded-lg">
              <Users className="w-8 h-8 mx-auto mb-2 text-purple-700" />
              <p className="text-2xl font-bold text-purple-700">35%</p>
              <p className="text-sm text-gray-600">Repeat Rate</p>
            </div>
            <div className="text-center p-4 bg-orange-100 rounded-lg">
              <Target className="w-8 h-8 mx-auto mb-2 text-orange-700" />
              <p className="text-2xl font-bold text-orange-700">8K</p>
              <p className="text-sm text-gray-600">Subscribers</p>
            </div>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="font-bold mb-4 text-center">Growth Trajectory</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Month 1-3</span>
                <div className="flex-1 mx-4 bg-gray-200 rounded-full h-3">
                  <div className="bg-green-600 h-3 rounded-full" style={{width: '20%'}}></div>
                </div>
                <span className="font-semibold">5K users</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Month 4-6</span>
                <div className="flex-1 mx-4 bg-gray-200 rounded-full h-3">
                  <div className="bg-green-600 h-3 rounded-full" style={{width: '45%'}}></div>
                </div>
                <span className="font-semibold">22K users</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Month 7-9</span>
                <div className="flex-1 mx-4 bg-gray-200 rounded-full h-3">
                  <div className="bg-green-600 h-3 rounded-full" style={{width: '100%'}}></div>
                </div>
                <span className="font-semibold">50K users</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Go-to-Market Strategy",
      subtitle: "Phased expansion across key markets",
      content: (
        <div className="space-y-5">
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-5 rounded-lg text-white">
            <h3 className="font-bold text-lg mb-2">Phase 1: City Launch (Months 1-6)</h3>
            <p className="text-sm">Focus on 3 urban neighborhoods, establish operations, achieve product-market fit</p>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-5 rounded-lg text-white">
            <h3 className="font-bold text-lg mb-2">Phase 2: Metro Expansion (Months 7-12)</h3>
            <p className="text-sm">Scale to 15 neighborhoods across metro area, optimize unit economics</p>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-5 rounded-lg text-white">
            <h3 className="font-bold text-lg mb-2">Phase 3: Multi-City (Months 13-24)</h3>
            <p className="text-sm">Launch in 3 additional cities, replicate playbook, achieve regional presence</p>
          </div>
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <h4 className="font-bold mb-3">Customer Acquisition Channels</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>✓ Referral program (rs1800 credit)</div>
              <div>✓ Local partnerships (gyms, offices)</div>
              <div>✓ Social media advertising</div>
              <div>✓ Influencer collaborations</div>
              <div>✓ SEO and content marketing</div>
              <div>✓ Strategic PR campaigns</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Financial Projections",
      subtitle: "Path to profitability in 24 months",
      content: (
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Metric</th>
                  <th className="p-3 text-right">Year 1</th>
                  <th className="p-3 text-right">Year 2</th>
                  <th className="p-3 text-right">Year 3</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="p-3 font-medium">Revenue</td>
                  <td className="p-3 text-right">72crore</td>
                  <td className="p-3 text-right">252crore</td>
                  <td className="p-3 text-right">675crore</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-3 font-medium">Gross Margin</td>
                  <td className="p-3 text-right">18%</td>
                  <td className="p-3 text-right">22%</td>
                  <td className="p-3 text-right">25%</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Active Users</td>
                  <td className="p-3 text-right">75K</td>
                  <td className="p-3 text-right">250K</td>
                  <td className="p-3 text-right">600K</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-3 font-medium">EBITDA</td>
                  <td className="p-3 text-right text-red-600">-22.5crore</td>
                  <td className="p-3 text-right text-green-600">10.8 crore</td>
                  <td className="p-3 text-right text-green-600">76.5 crore</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600 mb-1">Customer Life Time Value</p>
              <p className="text-2xl font-bold text-blue-700">216000</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600 mb-1">Customer Acquistion cost AC</p>
              <p className="text-2xl font-bold text-green-700">4050</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600 mb-1">LTV:CAC Ratio</p>
              <p className="text-2xl font-bold text-purple-700">53:1</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "The Ask",
      subtitle: "Series A Funding",
      content: (
        <div className="space-y-6 text-center">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 p-8 rounded-lg text-white">
            <h2 className="text-5xl font-bold mb-3">45crore</h2>
            <p className="text-xl">Seeking Series A Investment</p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-left">
            <div className="bg-gray-50 p-5 rounded-lg">
              <h3 className="font-bold text-lg mb-3">Use of Funds</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• 40% - Geographic expansion</li>
                <li>• 25% - Technology & AI development</li>
                <li>• 20% - Marketing & growth</li>
                <li>• 15% - Operational infrastructure</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-5 rounded-lg">
              <h3 className="font-bold text-lg mb-3">Key Milestones</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Launch 3 new cities</li>
                <li>• Reach 250K active users</li>
                <li>• Achieve profitability</li>
                <li>• Build tech moat with AI</li>
              </ul>
            </div>
          </div>
          <div className="bg-yellow-50 border-2 border-yellow-400 p-6 rounded-lg">
            <p className="text-lg font-semibold text-gray-800">Join us in transforming how millions shop for groceries</p>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Slide Content */}
          <div className="p-12 min-h-[600px] flex flex-col">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {slides[currentSlide].title}
              </h1>
              <p className="text-xl text-gray-600">
                {slides[currentSlide].subtitle}
              </p>
            </div>
            <div className="flex-1">
              {slides[currentSlide].content}
            </div>
          </div>

          {/* Navigation */}
          <div className="bg-gray-50 px-12 py-6 flex items-center justify-between border-t">
            <button
              onClick={prevSlide}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow disabled:opacity-50"
              disabled={currentSlide === 0}
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>
            
            <div className="flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide 
                      ? 'bg-green-600 w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-colors disabled:opacity-50"
              disabled={currentSlide === slides.length - 1}
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Slide Counter */}
          <div className="bg-gray-100 px-12 py-3 text-center text-sm text-gray-600">
            Slide {currentSlide + 1} of {slides.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PitchDeck;
