
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useHealthData } from "@/hooks/useHealthData";
import { Activity, Calendar, FileText } from "lucide-react";
import { format } from "date-fns";

const HealthAnalysisHistory = () => {
  const { healthAnalyses, isLoadingAnalyses, analysesError } = useHealthData();

  if (isLoadingAnalyses) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (analysesError) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-destructive">Error loading health analyses</p>
        </CardContent>
      </Card>
    );
  }

  if (!healthAnalyses || healthAnalyses.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <Activity className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">No health analyses yet</p>
          <p className="text-sm text-muted-foreground mt-2">
            Start by taking a health analysis to see your results here
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Health Analysis History</h2>
      {healthAnalyses.map((analysis) => (
        <Card key={analysis.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 capitalize">
                <FileText className="h-5 w-5" />
                {analysis.analysis_type} Analysis
              </CardTitle>
              <Badge variant="outline">
                <Calendar className="h-3 w-3 mr-1" />
                {format(new Date(analysis.created_at!), 'MMM d, yyyy')}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium mb-2">Input Parameters:</h4>
                <div className="bg-muted p-3 rounded-md">
                  <pre className="text-sm whitespace-pre-wrap">
                    {JSON.stringify(analysis.input_data, null, 2)}
                  </pre>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Analysis Results:</h4>
                <div className="bg-emerald-50 dark:bg-emerald-950/20 p-3 rounded-md border border-emerald-200 dark:border-emerald-800">
                  <pre className="text-sm whitespace-pre-wrap">
                    {JSON.stringify(analysis.result_data, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default HealthAnalysisHistory;
