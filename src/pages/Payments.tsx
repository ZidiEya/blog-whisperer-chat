
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, CreditCard, Users } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import PaymentModal from '@/components/payment/PaymentModal';

const Payments = () => {
  const { toast } = useToast();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{
    type: 'membership' | 'consultation';
    name: string;
    price: number;
    description: string;
  } | null>(null);

  const handlePaymentClick = (type: 'membership' | 'consultation', name: string, price: number, description: string) => {
    setSelectedItem({ type, name, price, description });
    setIsPaymentModalOpen(true);
  };

  const handlePaymentComplete = () => {
    toast({
      title: "Payment Successful",
      description: `Thank you for your ${selectedItem?.type}! We'll be in touch shortly.`,
    });
    setIsPaymentModalOpen(false);
  };

  return (
    <main className="py-12">
      <div className="blog-container">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Tunisie Hub Services</h1>
        <p className="text-xl text-center text-muted-foreground max-w-2xl mx-auto mb-12">
          Explore our premium services designed to help you connect with Tunisian culture and business opportunities.
        </p>

        <Tabs defaultValue="membership" className="w-full max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="membership" className="text-center py-3">
              <Users className="mr-2 h-4 w-4" />
              Membership Plans
            </TabsTrigger>
            <TabsTrigger value="consultation" className="text-center py-3">
              <CreditCard className="mr-2 h-4 w-4" />
              Consultation Services
            </TabsTrigger>
          </TabsList>

          <TabsContent value="membership" className="space-y-4">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Basic Plan */}
              <Card className="relative overflow-hidden">
                <CardHeader>
                  <CardTitle>Basic</CardTitle>
                  <CardDescription>Free access to standard content</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold mb-6">
                    Free
                  </div>
                  <ul className="space-y-2 mb-8">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-blog-accent mr-2" />
                      <span className="text-sm">Access to all public articles</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-blog-accent mr-2" />
                      <span className="text-sm">AI chatbot assistance</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-blog-accent mr-2" />
                      <span className="text-sm">Receive monthly newsletter</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Get Started</Button>
                </CardFooter>
              </Card>
              
              {/* Premium Plan */}
              <Card className="relative overflow-hidden border-blog-accent shadow-lg">
                <div className="absolute top-0 left-0 w-full bg-blog-accent text-white text-center py-1 text-xs font-bold">
                  MOST POPULAR
                </div>
                <CardHeader className="pt-8">
                  <CardTitle>Premium</CardTitle>
                  <CardDescription>Enhanced access and benefits</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold mb-6">
                    $9.99<span className="text-base font-normal">/month</span>
                  </div>
                  <ul className="space-y-2 mb-8">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-blog-accent mr-2" />
                      <span className="text-sm">Everything in Basic</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-blog-accent mr-2" />
                      <span className="text-sm">Exclusive premium articles</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-blog-accent mr-2" />
                      <span className="text-sm">Monthly virtual events</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-blog-accent mr-2" />
                      <span className="text-sm">Digital resources & guides</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-blog-accent hover:bg-blog-highlight"
                    onClick={() => handlePaymentClick('membership', 'Premium Membership', 9.99, 'Monthly premium membership')}
                  >
                    Subscribe Now
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Business Plan */}
              <Card className="relative overflow-hidden">
                <CardHeader>
                  <CardTitle>Business</CardTitle>
                  <CardDescription>For organizations and teams</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold mb-6">
                    $29.99<span className="text-base font-normal">/month</span>
                  </div>
                  <ul className="space-y-2 mb-8">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-blog-accent mr-2" />
                      <span className="text-sm">Everything in Premium</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-blog-accent mr-2" />
                      <span className="text-sm">Up to 5 team members</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-blog-accent mr-2" />
                      <span className="text-sm">Quarterly consultation calls</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-blog-accent mr-2" />
                      <span className="text-sm">Customized market reports</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-blog-accent mr-2" />
                      <span className="text-sm">Priority support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handlePaymentClick('membership', 'Business Membership', 29.99, 'Monthly business membership with team access')}
                  >
                    Subscribe Now
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="consultation" className="space-y-4">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Market Entry Consultation */}
              <Card>
                <CardHeader>
                  <CardTitle>Market Entry Strategy</CardTitle>
                  <CardDescription>Custom strategies for entering the Tunisian market</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold mb-6">
                    $199<span className="text-base font-normal">/session</span>
                  </div>
                  <ul className="space-y-2 mb-8">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-blog-accent mr-2" />
                      <span className="text-sm">90-minute strategy session</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-blog-accent mr-2" />
                      <span className="text-sm">Market analysis document</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-blog-accent mr-2" />
                      <span className="text-sm">Competitive landscape overview</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-blog-accent mr-2" />
                      <span className="text-sm">Follow-up email support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-blog-accent hover:bg-blog-highlight"
                    onClick={() => handlePaymentClick('consultation', 'Market Entry Strategy', 199, '90-minute consultation for market entry')}
                  >
                    Book Consultation
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Cultural Integration */}
              <Card>
                <CardHeader>
                  <CardTitle>Cultural Integration</CardTitle>
                  <CardDescription>Training on Tunisian business etiquette</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold mb-6">
                    $149<span className="text-base font-normal">/session</span>
                  </div>
                  <ul className="space-y-2 mb-8">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-blog-accent mr-2" />
                      <span className="text-sm">60-minute training session</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-blog-accent mr-2" />
                      <span className="text-sm">Business etiquette guide</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-blog-accent mr-2" />
                      <span className="text-sm">Common phrases document</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-blog-accent mr-2" />
                      <span className="text-sm">Cultural dos and don'ts</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-blog-accent hover:bg-blog-highlight"
                    onClick={() => handlePaymentClick('consultation', 'Cultural Integration', 149, '60-minute training on business etiquette')}
                  >
                    Book Training
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Local Partnership */}
              <Card>
                <CardHeader>
                  <CardTitle>Partnership Facilitation</CardTitle>
                  <CardDescription>Connect with vetted Tunisian businesses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold mb-6">
                    $299<span className="text-base font-normal">/package</span>
                  </div>
                  <ul className="space-y-2 mb-8">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-blog-accent mr-2" />
                      <span className="text-sm">Curated list of 5 potential partners</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-blog-accent mr-2" />
                      <span className="text-sm">Introduction facilitation</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-blog-accent mr-2" />
                      <span className="text-sm">Initial meeting coordination</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-blog-accent mr-2" />
                      <span className="text-sm">30-day follow-up support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-blog-accent hover:bg-blog-highlight"
                    onClick={() => handlePaymentClick('consultation', 'Partnership Facilitation', 299, 'Connect with 5 potential business partners')}
                  >
                    Get Connected
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {isPaymentModalOpen && selectedItem && (
        <PaymentModal
          open={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          item={selectedItem}
          onPaymentComplete={handlePaymentComplete}
        />
      )}
    </main>
  );
};

export default Payments;
