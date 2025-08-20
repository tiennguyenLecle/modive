export type SpeakerType = 'user' | 'chatbot' | 'system';

export type Message = {
  id: string;
  chatroom_id: string;
  message: string;
  speaker_type?: SpeakerType;
  speaker_id?: string;
  message_embedding?: null;
  metadata?: {};
  created_at?: string;
  updated_at?: string;
  v2_data?: {
    id: string;
    type: SpeakerType;
    origin: {
      type: string;
    };
    message: {
      role: SpeakerType;
      parts: [
        {
          text: string;
          type: string;
        },
      ];
      _modelDataType: string;
    };
    speakerId: string;
    created_at: string;
  };
};
