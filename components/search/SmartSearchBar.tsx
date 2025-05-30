"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Globe, Linkedin, Database, Sparkles, Mic } from "lucide-react"
import { useRouter } from "next/navigation"

interface SmartSearchBarProps {
  placeholder?: string
  showSuggestions?: boolean
  className?: string
}

export function SmartSearchBar({
  placeholder = "Search for companies...",
  showSuggestions = false,
  className = "",
}: SmartSearchBarProps) {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestionsList, setShowSuggestionsList] = useState(false)
  const [selectedSources, setSelectedSources] = useState<string[]>(["google", "linkedin", "crunchbase"])
  const [isListening, setIsListening] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const searchSuggestions = [
    "Marketing agencies in Geneva with 10-50 employees",
    "SaaS companies with Series A funding in Europe",
    "Tech startups using React and TypeScript",
    "Fintech companies in Switzerland",
    "E-commerce platforms with 50+ employees",
    "AI companies founded after 2020",
    "Healthcare startups in Zurich",
    "Consulting firms in London with remote work",
  ]

  const sources = [
    { id: "google", label: "Google", icon: Globe, color: "bg-blue-500" },
    { id: "linkedin", label: "LinkedIn", icon: Linkedin, color: "bg-blue-600" },
    { id: "crunchbase", label: "Crunchbase", icon: Database, color: "bg-orange-500" },
  ]

  useEffect(() => {
    if (query.length > 2 && showSuggestions) {
      const filtered = searchSuggestions.filter((suggestion) => suggestion.toLowerCase().includes(query.toLowerCase()))
      setSuggestions(filtered.slice(0, 5))
      setShowSuggestionsList(true)
    } else {
      setShowSuggestionsList(false)
    }
  }, [query, showSuggestions])

  const handleSearch = () => {
    if (query.trim()) {
      const searchParams = new URLSearchParams({
        q: query,
        sources: selectedSources.join(","),
      })
      router.push(`/search?${searchParams.toString()}`)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const toggleSource = (sourceId: string) => {
    setSelectedSources((prev) => (prev.includes(sourceId) ? prev.filter((id) => id !== sourceId) : [...prev, sourceId]))
  }

  const startVoiceInput = () => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = "en-US"

      recognition.onstart = () => setIsListening(true)
      recognition.onend = () => setIsListening(false)
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setQuery(transcript)
      }

      recognition.start()
    }
  }

  return (
    <div className={`relative w-full ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <Sparkles className="w-5 h-5 text-accent" />
        </div>
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="pl-12 pr-32 h-14 text-lg border-2 border-input focus:border-accent rounded-lg shadow-card"
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={startVoiceInput}
            className={`h-8 w-8 p-0 ${isListening ? "text-accent" : "text-secondary"}`}
          >
            <Mic className="w-4 h-4" />
          </Button>
          <Button onClick={handleSearch} className="h-10 px-6 bg-accent hover:bg-accent/90">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>
      </div>

      {/* Source Selectors */}
      <div className="flex items-center gap-2 mt-3">
        <span className="text-caption text-secondary">Search in:</span>
        {sources.map((source) => {
          const Icon = source.icon
          const isSelected = selectedSources.includes(source.id)
          return (
            <Badge
              key={source.id}
              variant={isSelected ? "default" : "outline"}
              className={`cursor-pointer transition-all ${
                isSelected ? `${source.color} text-white hover:opacity-80` : "hover:bg-muted border-secondary/20"
              }`}
              onClick={() => toggleSource(source.id)}
            >
              <Icon className="w-3 h-3 mr-1" />
              {source.label}
            </Badge>
          )
        })}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestionsList && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-input rounded-lg shadow-floating z-50">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="px-4 py-3 hover:bg-muted cursor-pointer border-b border-input last:border-b-0 first:rounded-t-lg last:rounded-b-lg"
              onClick={() => {
                setQuery(suggestion)
                setShowSuggestionsList(false)
                inputRef.current?.focus()
              }}
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-secondary" />
                <span className="text-body">{suggestion}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
