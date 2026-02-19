import { create } from 'zustand';

interface CallState {
    status: 'idle' | 'incoming' | 'active' | 'analyzing' | 'result';
    caller: string;
    verdict: 'safe' | 'dangerous' | null;
    confidence: number;
    startIncomingCall: (callerName: string) => void;
    answerCall: () => void;
    endCall: () => void;
    setVerdict: (verdict: 'safe' | 'dangerous', confidence: number) => void;
}

export const useCallStore = create<CallState>((set) => ({
    status: 'idle',
    caller: 'Unknown Caller',
    verdict: null,
    confidence: 0,
    startIncomingCall: (callerName) => set({ status: 'incoming', caller: callerName, verdict: null, confidence: 0 }),
    answerCall: () => set({ status: 'active' }),
    endCall: () => set({ status: 'idle', verdict: null, confidence: 0 }),
    setVerdict: (verdict, confidence) => set({ status: 'result', verdict, confidence })
}));
