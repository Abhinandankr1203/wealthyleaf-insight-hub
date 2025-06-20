import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle, Info, Eye, Star, Zap } from "lucide-react";

interface MarketInsight {
  id: number;
  title: string;
  description: string;
  impact: 'positive' | 'negative' | 'neutral';
  confidence: number;
  category: 'market' | 'sector' | 'economic' | 'technical';
  timestamp: string;
  tags: string[];
  actionable?: boolean;
  recommendation?: string;
}

interface MarketInsightsProps {
  insights: MarketInsight[];
  onInsightClick?: (insight: MarketInsight) => void;
}

const MarketInsights = ({ insights, onInsightClick }: MarketInsightsProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'confidence' | 'timestamp'>('confidence');

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'positive':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'negative':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Info className="w-4 h-4 text-blue-600" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive':
        return 'bg-green-50 border-green-200';
      case 'negative':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600';
    if (confidence >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'market':
        return 'bg-purple-100 text-purple-800';
      case 'sector':
        return 'bg-blue-100 text-blue-800';
      case 'economic':
        return 'bg-green-100 text-green-800';
      case 'technical':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredInsights = insights
    .filter(insight => selectedCategory === 'all' || insight.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === 'confidence') {
        return b.confidence - a.confidence;
      }
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });

  const categories = [
    { key: 'all', label: 'All', count: insights.length },
    { key: 'market', label: 'Market', count: insights.filter(i => i.category === 'market').length },
    { key: 'sector', label: 'Sector', count: insights.filter(i => i.category === 'sector').length },
    { key: 'economic', label: 'Economic', count: insights.filter(i => i.category === 'economic').length },
    { key: 'technical', label: 'Technical', count: insights.filter(i => i.category === 'technical').length },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              <span>Market Insights</span>
            </CardTitle>
            <CardDescription>AI-powered market analysis and recommendations</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Star className="w-4 h-4 mr-2" />
              Save Insights
            </Button>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex space-x-1">
            {categories.map((category) => (
              <Button
                key={category.key}
                variant={selectedCategory === category.key ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.key)}
                className="text-xs"
              >
                {category.label}
                <Badge variant="secondary" className="ml-1 text-xs">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <Button
              variant={sortBy === 'confidence' ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy('confidence')}
              className="text-xs"
            >
              Confidence
            </Button>
            <Button
              variant={sortBy === 'timestamp' ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy('timestamp')}
              className="text-xs"
            >
              Recent
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {filteredInsights.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Zap className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No insights available for the selected category.</p>
            </div>
          ) : (
            filteredInsights.map((insight) => (
              <div
                key={insight.id}
                className={`p-4 rounded-lg border ${getImpactColor(insight.impact)} hover:shadow-md transition-shadow cursor-pointer`}
                onClick={() => onInsightClick?.(insight)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {getImpactIcon(insight.impact)}
                    <h3 className="font-medium">{insight.title}</h3>
                    {insight.actionable && (
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        Actionable
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getCategoryColor(insight.category)}>
                      {insight.category}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <p className="text-sm text-gray-700 mb-3">{insight.description}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Confidence:</span>
                    <span className={`text-sm font-medium ${getConfidenceColor(insight.confidence)}`}>
                      {insight.confidence}%
                    </span>
                    <Progress value={insight.confidence} className="w-20 h-2" />
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(insight.timestamp).toLocaleDateString()}
                  </span>
                </div>
                
                {insight.recommendation && (
                  <div className="p-3 bg-white rounded border-l-4 border-blue-500">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-blue-900">Recommendation</p>
                        <p className="text-sm text-blue-700">{insight.recommendation}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {insight.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {insight.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
        
        {filteredInsights.length > 0 && (
          <div className="mt-6 pt-4 border-t">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {insights.filter(i => i.impact === 'positive').length}
                </div>
                <div className="text-sm text-gray-500">Positive</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {insights.filter(i => i.impact === 'negative').length}
                </div>
                <div className="text-sm text-gray-500">Negative</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {insights.filter(i => i.actionable).length}
                </div>
                <div className="text-sm text-gray-500">Actionable</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MarketInsights; 