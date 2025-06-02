
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, Eye, FileText, Image, Volume2, Clock, HardDrive, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface ProcessingHistoryItem {
  id: string;
  type: 'audio' | 'image' | 'pdf';
  file_name: string;
  file_size: number;
  processing_time: number;
  created_at: string;
}

export const Results = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [history, setHistory] = useState<ProcessingHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    fetchProcessingHistory();
  }, [user, navigate]);

  const fetchProcessingHistory = async () => {
    if (!user || !supabase) return;
    
    try {
      const { data, error } = await supabase
        .from('processing_history')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setHistory((data || []).map(item => ({
        ...item,
        type: item.type as 'audio' | 'image' | 'pdf'
      })));
    } catch (error) {
      console.error('Error fetching processing history:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'audio':
        return <Volume2 className="h-5 w-5 text-blue-600" />;
      case 'image':
        return <Image className="h-5 w-5 text-green-600" />;
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-600" />;
      default:
        return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const variants = {
      audio: 'bg-blue-100 text-blue-800',
      image: 'bg-green-100 text-green-800',
      pdf: 'bg-red-100 text-red-800'
    };
    return variants[type as keyof typeof variants] || 'bg-gray-100 text-gray-800';
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatProcessingTime = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-6 hover:bg-white/50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Processing Results
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              View all your processed files and their accessibility transformations
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : history.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No files processed yet</h3>
              <p className="text-gray-600 mb-6">Start by uploading files on the main page</p>
              <Button onClick={() => navigate('/')} className="bg-blue-600 hover:bg-blue-700">
                Upload Files
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {history.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-600">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getTypeIcon(item.type)}
                      <div>
                        <CardTitle className="text-lg font-semibold text-gray-900">
                          {item.file_name}
                        </CardTitle>
                        <CardDescription className="flex items-center space-x-4 mt-1">
                          <Badge className={getTypeBadge(item.type)}>
                            {item.type.toUpperCase()}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            {new Date(item.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <HardDrive className="h-4 w-4" />
                      <span>Size: {formatFileSize(item.file_size)}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>Processed in: {formatProcessingTime(item.processing_time)}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <User className="h-4 w-4" />
                      <span>Status: Completed</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Accessibility Features Added:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-green-700">
                      {item.type === 'image' && (
                        <>
                          <span>• Alt text generated</span>
                          <span>• Color contrast optimized</span>
                          <span>• Screen reader compatible</span>
                          <span>• High contrast version</span>
                        </>
                      )}
                      {item.type === 'audio' && (
                        <>
                          <span>• Transcription generated</span>
                          <span>• Closed captions added</span>
                          <span>• Audio description track</span>
                          <span>• Speed controls enabled</span>
                        </>
                      )}
                      {item.type === 'pdf' && (
                        <>
                          <span>• Text-to-speech ready</span>
                          <span>• Structured headings</span>
                          <span>• Alt text for images</span>
                          <span>• Keyboard navigation</span>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};
