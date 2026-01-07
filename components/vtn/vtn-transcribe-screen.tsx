"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, FileText, MoreHorizontal, Mic, Square, Sparkles, Check, AlertCircle } from "lucide-react"
import { useSpeechToText } from "@/hooks/use-speech-to-text"

interface VTNTranscribeScreenProps {
  onBack: () => void
}

export function VTNTranscribeScreen({ onBack }: VTNTranscribeScreenProps) {
  const { transcript, interimTranscript, isListening, isSupported, error, toggleListening, resetTranscript } =
    useSpeechToText()

  const [showDoneConfirmation, setShowDoneConfirmation] = useState(false)

  const handleDone = () => {
    if (transcript) {
      setShowDoneConfirmation(true)
      setTimeout(() => setShowDoneConfirmation(false), 2000)
    }
  }

  const displayText = transcript + interimTranscript

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Top Navigation */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <motion.button onClick={onBack} whileTap={{ scale: 0.92 }} className="flex items-center gap-1 text-[#007AFF]">
          <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
          <span className="text-[15px] font-medium">Back</span>
        </motion.button>
        <h1 className="font-semibold text-[17px] text-black">Untitled Note</h1>
        <div className="flex items-center gap-3">
          <motion.button whileTap={{ scale: 0.92 }} className="text-[#007AFF]">
            <FileText className="w-5 h-5" />
          </motion.button>
          <motion.button whileTap={{ scale: 0.92 }} className="text-[#007AFF]">
            <MoreHorizontal className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Editor Space */}
      <div className="flex-1 p-4 pb-28 overflow-hidden">
        <motion.div
          className="relative w-full h-full bg-[#F8F8F8] rounded-[24px] p-5 overflow-hidden"
          style={{
            boxShadow: "0 4px 20px rgba(0,0,0,0.08), inset 0 0 0 1px rgba(0,0,0,0.04)",
          }}
        >
          {/* Editor Content */}
          <div className="h-full overflow-y-auto scrollbar-hide">
            {!isSupported ? (
              <div className="flex flex-col items-center justify-center h-full text-center px-4">
                <AlertCircle className="w-10 h-10 text-orange-500 mb-3" />
                <p className="text-sm text-gray-500 leading-relaxed">
                  Speech recognition is not supported in this browser. Please try Chrome or Safari.
                </p>
              </div>
            ) : displayText ? (
              <div className="space-y-1">
                <p className="text-[15px] leading-relaxed text-gray-800 font-normal">
                  {transcript}
                  {interimTranscript && (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-400">
                      {interimTranscript}
                    </motion.span>
                  )}
                  {isListening && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
                      className="inline-block w-0.5 h-4 bg-[#007AFF] ml-0.5 align-middle"
                    />
                  )}
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center px-4">
                <motion.div
                  animate={isListening ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-[#007AFF]/20 to-[#007AFF]/5 flex items-center justify-center mb-4"
                >
                  <Mic className={`w-7 h-7 ${isListening ? "text-[#007AFF]" : "text-gray-400"}`} />
                </motion.div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {isListening ? "Listening... Start speaking" : "Tap the mic button to start recording"}
                </p>
              </div>
            )}
          </div>

          {/* Clear Button */}
          <AnimatePresence>
            {transcript && !isListening && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={resetTranscript}
                className="absolute top-3 right-3 px-3 py-1.5 bg-white rounded-full text-xs font-medium text-gray-500 hover:text-gray-700 shadow-sm border border-gray-100"
              >
                Clear
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Control Bar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <motion.div
          className="flex items-center gap-4 px-4 py-3 bg-black rounded-full"
          style={{ boxShadow: "0 10px 40px rgba(0,0,0,0.3)" }}
        >
          {/* AI/Options Button */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center"
          >
            <Sparkles className="w-5 h-5 text-white/80" />
          </motion.button>

          {/* Recording Button */}
          <div className="relative">
            <AnimatePresence>
              {isListening && (
                <>
                  <motion.div
                    initial={{ scale: 1, opacity: 0.6 }}
                    animate={{ scale: 1.8, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    className="absolute inset-0 rounded-full bg-red-500"
                  />
                  <motion.div
                    initial={{ scale: 1, opacity: 0.4 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.3 }}
                    className="absolute inset-0 rounded-full bg-red-500"
                  />
                </>
              )}
            </AnimatePresence>

            <motion.button
              onClick={toggleListening}
              whileTap={{ scale: 0.88 }}
              className="relative w-14 h-14 rounded-full bg-red-500 flex items-center justify-center"
              style={{
                boxShadow: isListening ? "0 0 20px rgba(239, 68, 68, 0.5)" : "0 4px 15px rgba(239, 68, 68, 0.3)",
              }}
            >
              <AnimatePresence mode="wait">
                {isListening ? (
                  <motion.div
                    key="stop"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Square className="w-5 h-5 text-white fill-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="mic"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Mic className="w-6 h-6 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Done Button */}
          <motion.button
            onClick={handleDone}
            whileTap={{ scale: 0.92 }}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-300 ${
              showDoneConfirmation ? "bg-green-500" : transcript ? "bg-white/20" : "bg-white/10"
            }`}
          >
            <Check
              className={`w-5 h-5 transition-colors duration-300 ${
                showDoneConfirmation ? "text-white" : "text-white/80"
              }`}
            />
          </motion.button>
        </motion.div>
      </div>

      {/* Done Toast */}
      <AnimatePresence>
        {showDoneConfirmation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-28 left-1/2 -translate-x-1/2 px-4 py-2.5 bg-green-500/20 border border-green-500/30 rounded-xl"
          >
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span className="text-xs text-green-600 whitespace-nowrap">Note saved successfully</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
