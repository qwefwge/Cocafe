import { useCharity } from '@/context/CharityContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';

export default function CharityPage() {
  const { raised, goal, cause, options, voteForCause } = useCharity();

  const data = [
    { name: 'Operating', value: 60, color: '#BCCCDC' }, // coffee-200
    { name: 'Restock', value: 30, color: '#1a3965' }, // coffee-800
    { name: 'Charity', value: 10, color: '#b20838' }, // crimson-500
  ];

  const handleVote = (id: number) => {
    voteForCause(id);
    toast.success('Thanks for voting!');
  };

  return (
    <div className="pb-24 pt-4 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-hand font-bold text-coffee-800">Community Impact</h1>
        <p className="text-coffee-600">Every meal you buy helps our community.</p>
      </div>

      {/* Monthly Progress */}
      <Card className="bg-coffee-800 text-white border-none">
        <CardHeader>
          <CardTitle className="text-white">October Goal</CardTitle>
          <p className="text-coffee-200 text-sm">Supporting: {cause}</p>
        </CardHeader>
        <CardContent>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>${raised.toFixed(2)} raised</span>
            <span>${goal} goal</span>
          </div>
          <div className="h-4 bg-coffee-900/50 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, (raised / goal) * 100)}%` }}
              className="h-full bg-green-400 rounded-full"
            />
          </div>
          <p className="mt-4 text-xs text-coffee-200 leading-relaxed">
            This month, we're funding new blankets and food supplies for the local animal shelter. You're amazing! 🐾
          </p>
        </CardContent>
      </Card>

      {/* Allocation Breakdown */}
      <section>
        <h2 className="text-xl font-hand font-bold text-coffee-800 mb-4">Where does the money go?</h2>
        <Card>
          <CardContent className="pt-6 flex items-center justify-between">
            <div className="h-32 w-32 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    innerRadius={35}
                    outerRadius={55}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center font-bold text-coffee-800 text-xs">
                100%
              </div>
            </div>
            <div className="space-y-2 text-sm">
              {data.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="font-medium text-coffee-600">{item.name}</span>
                  <span className="font-bold text-coffee-800">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Voting */}
      <section>
        <h2 className="text-xl font-hand font-bold text-coffee-800 mb-4">Vote for Next Month</h2>
        <div className="space-y-3">
          {options.map((option) => (
            <div key={option.id} className="bg-white p-4 rounded-2xl border border-coffee-100 flex items-center justify-between shadow-sm">
              <div>
                <h4 className="font-bold text-coffee-800">{option.name}</h4>
                <div className="text-xs text-coffee-400">{option.votes} votes</div>
              </div>
              <Button variant="outline" size="sm" className="rounded-xl h-8 text-xs" onClick={() => handleVote(option.id)}>
                Vote
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
