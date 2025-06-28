
import { supabase } from "@/integrations/supabase/client";

export interface HealthAnalysis {
  id?: string;
  user_id: string;
  analysis_type: string;
  input_data: any;
  result_data: any;
  created_at?: string;
  updated_at?: string;
}

export interface HealthAlert {
  id?: string;
  user_id: string;
  title: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
  category: string;
  is_read?: boolean;
  created_at?: string;
}

export interface UserProfile {
  id: string;
  email?: string;
  full_name?: string;
  avatar_url?: string;
  created_at?: string;
  updated_at?: string;
}

// Health Analysis functions
export const saveHealthAnalysis = async (analysis: HealthAnalysis) => {
  const { data, error } = await supabase
    .from('health_analyses')
    .insert(analysis)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const getUserHealthAnalyses = async (userId: string, analysisType?: string) => {
  let query = supabase
    .from('health_analyses')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (analysisType) {
    query = query.eq('analysis_type', analysisType);
  }
  
  const { data, error } = await query;
  if (error) throw error;
  return data;
};

// Health Alerts functions
export const createHealthAlert = async (alert: HealthAlert) => {
  const { data, error } = await supabase
    .from('health_alerts')
    .insert(alert)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const getUserHealthAlerts = async (userId: string) => {
  const { data, error } = await supabase
    .from('health_alerts')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const markAlertAsRead = async (alertId: string) => {
  const { data, error } = await supabase
    .from('health_alerts')
    .update({ is_read: true })
    .eq('id', alertId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// User Profile functions
export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) throw error;
  return data;
};

export const updateUserProfile = async (userId: string, updates: Partial<UserProfile>) => {
  const { data, error } = await supabase
    .from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', userId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Medical Images functions
export const uploadMedicalImage = async (userId: string, file: File, fileName: string) => {
  const filePath = `${userId}/${fileName}`;
  
  const { data, error } = await supabase.storage
    .from('medical-images')
    .upload(filePath, file);
  
  if (error) throw error;
  return data;
};

export const getMedicalImageUrl = async (userId: string, fileName: string) => {
  const filePath = `${userId}/${fileName}`;
  
  const { data } = supabase.storage
    .from('medical-images')
    .getPublicUrl(filePath);
  
  return data.publicUrl;
};

export const deleteMedicalImage = async (userId: string, fileName: string) => {
  const filePath = `${userId}/${fileName}`;
  
  const { error } = await supabase.storage
    .from('medical-images')
    .remove([filePath]);
  
  if (error) throw error;
};
