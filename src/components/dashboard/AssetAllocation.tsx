import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { MoreHorizontal, TrendingUp, TrendingDown, DollarSign } from "lucide-react";

interface Asset {
  name: string;
  value: number;
  color: string;
  change?: number;
  allocation?: number;
}

interface AssetAllocationProps {
  assets: Asset[];
  title?: string;
  description?: string;
}

const AssetAllocation = ({ 
  assets, 
  title = "Asset Allocation", 
  description = "Your portfolio breakdown by asset class" 
}: AssetAllocationProps) => {
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);

  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return ((value / totalValue) * 100).toFixed(1);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm text-gray-600">{formatCurrency(data.value)}</p>
          <p className="text-sm text-gray-600">{formatPercentage(data.value)}%</p>
          {data.change && (
            <p className={`text-sm ${data.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {data.change >= 0 ? '+' : ''}{data.change.toFixed(2)}%
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-purple-500 rounded-full" />
            <span>{title}</span>
          </span>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={assets}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  onClick={(data) => setSelectedAsset(data.name)}
                >
                  {assets.map((asset, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={asset.color}
                      className={`cursor-pointer transition-opacity ${
                        selectedAsset === asset.name ? 'opacity-100' : 'opacity-80'
                      }`}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Total Portfolio Value</h3>
              <span className="font-bold text-lg">{formatCurrency(totalValue)}</span>
            </div>
            
            <div className="space-y-3">
              {assets.map((asset, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedAsset === asset.name 
                      ? 'bg-blue-50 border-blue-200' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                  onClick={() => setSelectedAsset(asset.name)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: asset.color }}
                      />
                      <span className="font-medium">{asset.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{formatCurrency(asset.value)}</div>
                      <div className="text-sm text-gray-500">{formatPercentage(asset.value)}%</div>
                    </div>
                  </div>
                  
                  <Progress value={Number(formatPercentage(asset.value))} className="h-2" />
                  
                  {asset.change && (
                    <div className="flex items-center space-x-1 mt-2">
                      {asset.change >= 0 ? (
                        <TrendingUp className="w-3 h-3 text-green-500" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-red-500" />
                      )}
                      <span className={`text-xs ${asset.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {asset.change >= 0 ? '+' : ''}{asset.change.toFixed(2)}%
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="pt-4 border-t">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Diversification Score</span>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Excellent
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssetAllocation; 