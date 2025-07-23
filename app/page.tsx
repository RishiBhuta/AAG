"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Copy, MessageCircle, Send } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function PromptGenerator() {
  const [userInput, setUserInput] = useState("")
  const [category, setCategory] = useState("")
  const [audience, setAudience] = useState("")
  const [complexity, setComplexity] = useState("")
  const [generatedPrompts, setGeneratedPrompts] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const generatePromptsLocally = (input: string, field: string, level: string, detail: string): string[] => {
    // Field-specific data
    const fieldData = {
      technology: {
        beginner: "coding mentor",
        intermediate: "software developer",
        advanced: "tech lead",
        expert: "CTO",
        focus: {
          beginner: "basic programming concepts",
          intermediate: "development best practices",
          advanced: "system architecture",
          expert: "technology strategy",
        },
      },
      healthcare: {
        beginner: "healthcare guide",
        intermediate: "medical practitioner",
        advanced: "specialist doctor",
        expert: "chief medical officer",
        focus: {
          beginner: "basic health concepts",
          intermediate: "clinical procedures",
          advanced: "specialized treatments",
          expert: "healthcare innovation",
        },
      },
      marketing: {
        beginner: "marketing tutor",
        intermediate: "marketing manager",
        advanced: "marketing director",
        expert: "CMO",
        focus: {
          beginner: "marketing basics",
          intermediate: "campaign management",
          advanced: "strategic marketing",
          expert: "brand transformation",
        },
      },
      finance: {
        beginner: "financial advisor",
        intermediate: "investment analyst",
        advanced: "portfolio manager",
        expert: "CFO",
        focus: {
          beginner: "personal finance",
          intermediate: "investment strategies",
          advanced: "risk management",
          expert: "financial innovation",
        },
      },
      design: {
        beginner: "design teacher",
        intermediate: "UX designer",
        advanced: "design director",
        expert: "chief design officer",
        focus: {
          beginner: "design fundamentals",
          intermediate: "user experience",
          advanced: "design systems",
          expert: "design leadership",
        },
      },
      business: {
        beginner: "business coach",
        intermediate: "business analyst",
        advanced: "strategy consultant",
        expert: "CEO",
        focus: {
          beginner: "business basics",
          intermediate: "operations management",
          advanced: "strategic planning",
          expert: "business transformation",
        },
      },
      education: {
        beginner: "learning facilitator",
        intermediate: "educator",
        advanced: "curriculum specialist",
        expert: "education director",
        focus: {
          beginner: "learning basics",
          intermediate: "teaching methods",
          advanced: "curriculum design",
          expert: "educational innovation",
        },
      },
      engineering: {
        beginner: "engineering tutor",
        intermediate: "engineer",
        advanced: "senior engineer",
        expert: "engineering director",
        focus: {
          beginner: "engineering principles",
          intermediate: "technical solutions",
          advanced: "system optimization",
          expert: "engineering innovation",
        },
      },
      legal: {
        beginner: "legal advisor",
        intermediate: "attorney",
        advanced: "senior counsel",
        expert: "chief legal officer",
        focus: {
          beginner: "legal basics",
          intermediate: "legal procedures",
          advanced: "complex litigation",
          expert: "legal strategy",
        },
      },
      media: {
        beginner: "content creator",
        intermediate: "media producer",
        advanced: "creative director",
        expert: "media executive",
        focus: {
          beginner: "content creation",
          intermediate: "media production",
          advanced: "creative strategy",
          expert: "media innovation",
        },
      },
      sales: {
        beginner: "sales trainer",
        intermediate: "sales manager",
        advanced: "sales director",
        expert: "chief revenue officer",
        focus: {
          beginner: "sales fundamentals",
          intermediate: "sales processes",
          advanced: "sales strategy",
          expert: "revenue optimization",
        },
      },
      other: {
        beginner: "mentor",
        intermediate: "professional",
        advanced: "specialist",
        expert: "industry leader",
        focus: {
          beginner: "basic concepts",
          intermediate: "practical application",
          advanced: "strategic approach",
          expert: "industry innovation",
        },
      },
    }

    const currentField = fieldData[field as keyof typeof fieldData] || fieldData.other
    const currentRole = currentField[level as keyof typeof currentField] || currentField.intermediate
    const currentFocus = currentField.focus[level as keyof typeof currentField.focus] || currentField.focus.intermediate

    const prompts = []

    // Generate 3 different prompts based on level and detail
    if (level === "beginner") {
      if (detail === "simple") {
        prompts.push(`I'm new to ${field || "this area"}. Help me understand: "${input}"

Explain it simply with basic steps.`)

        prompts.push(`Beginner question about: "${input}"

What do I need to know first?`)

        prompts.push(`I'm just starting with ${field || "this topic"}. Can you help with: "${input}"

Keep it easy to understand.`)
      } else if (detail === "step-by-step") {
        prompts.push(`I'm a beginner working on: "${input}"

Give me numbered steps I can follow easily.`)

        prompts.push(`Step-by-step help needed for: "${input}"

I'm new to ${field || "this"}, so break it down simply.`)

        prompts.push(`Create a beginner's guide for: "${input}"

Number each step and explain why it matters.`)
      } else if (detail === "comprehensive") {
        prompts.push(`I'm new to ${field || "this field"} and need complete guidance on: "${input}"

Cover everything from basics to completion.`)

        prompts.push(`Comprehensive beginner's guide needed for: "${input}"

Include background, steps, and what to expect.`)

        prompts.push(`I'm starting from zero with: "${input}"

Give me a complete learning path with explanations.`)
      } else {
        // detailed
        prompts.push(`As a ${field || "general"} beginner, I need detailed help with: "${input}"

Explain the concepts and give practical examples.`)

        prompts.push(`I'm learning ${field || "this area"} and working on: "${input}"

Provide detailed guidance with clear explanations.`)

        prompts.push(`Beginner seeking detailed advice on: "${input}"

Include examples and common mistakes to avoid.`)
      }
    } else if (level === "intermediate") {
      if (detail === "simple") {
        prompts.push(`I have some ${field || "general"} experience. Quick advice on: "${input}"

Give me the key points.`)

        prompts.push(`Intermediate-level question: "${input}"

What are the main considerations?`)

        prompts.push(`I know the basics of ${field || "this area"}. Help with: "${input}"

Focus on the important parts.`)
      } else if (detail === "step-by-step") {
        prompts.push(`I'm at intermediate level in ${field || "this field"}. Create a process for: "${input}"

Give me structured steps to follow.`)

        prompts.push(`Intermediate practitioner needs workflow for: "${input}"

Break it into logical phases.`)

        prompts.push(`I have ${field || "general"} experience. Design a methodology for: "${input}"

Structure it as actionable steps.`)
      } else if (detail === "comprehensive") {
        prompts.push(`I'm an intermediate ${field || "professional"} working on: "${input}"

Provide comprehensive analysis covering all aspects.`)

        prompts.push(`Comprehensive planning needed for: "${input}"

I have intermediate ${field || "general"} knowledge - cover strategy to execution.`)

        prompts.push(`Intermediate-level comprehensive guide for: "${input}"

Include planning, implementation, and optimization.`)
      } else {
        // detailed
        prompts.push(`As an intermediate ${field || "professional"}, I need detailed guidance on: "${input}"

Include best practices and practical considerations.`)

        prompts.push(`I have solid ${field || "general"} foundation. Detailed help with: "${input}"

Focus on implementation and optimization.`)

        prompts.push(`Intermediate practitioner seeking detailed advice on: "${input}"

Cover methodology and practical insights.`)
      }
    } else if (level === "advanced") {
      if (detail === "simple") {
        prompts.push(`Advanced ${field || "professional"} needs concise insights on: "${input}"

Focus on strategic considerations.`)

        prompts.push(`I'm advanced in ${field || "this area"}. Key strategic points for: "${input}"

Skip basics, give me the critical factors.`)

        prompts.push(`Advanced practitioner question: "${input}"

What are the strategic implications?`)
      } else if (detail === "step-by-step") {
        prompts.push(`Advanced ${field || "professional"} needs strategic framework for: "${input}"

Create a high-level implementation roadmap.`)

        prompts.push(`I'm at advanced level. Design strategic phases for: "${input}"

Focus on optimization and scaling.`)

        prompts.push(`Advanced practitioner needs structured approach to: "${input}"

Break into strategic milestones.`)
      } else if (detail === "comprehensive") {
        prompts.push(`I'm an advanced ${field || "professional"} tackling: "${input}"

Provide comprehensive strategic analysis with innovation opportunities.`)

        prompts.push(`Advanced comprehensive strategy needed for: "${input}"

Cover market positioning, competitive advantage, and scaling.`)

        prompts.push(`Advanced ${field || "expert"} needs complete strategic framework for: "${input}"

Include innovation, optimization, and future-proofing.`)
      } else {
        // detailed
        prompts.push(`Advanced ${field || "professional"} seeking detailed strategic guidance on: "${input}"

Focus on optimization, innovation, and competitive advantage.`)

        prompts.push(`I'm advanced in ${field || "this domain"}. Detailed analysis of: "${input}"

Include strategic implications and advanced techniques.`)

        prompts.push(`Advanced practitioner needs detailed strategic approach to: "${input}"

Cover methodology, optimization, and scaling considerations.`)
      }
    } else {
      // expert
      if (detail === "simple") {
        prompts.push(`Expert-level consultation: "${input}"

Give me the strategic essence and innovation opportunities.`)

        prompts.push(`I'm a ${field || "industry"} expert. Critical insights on: "${input}"

Focus on disruption and transformation potential.`)

        prompts.push(`Expert perspective needed on: "${input}"

What are the game-changing considerations?`)
      } else if (detail === "step-by-step") {
        prompts.push(`Expert-level strategic roadmap for: "${input}"

Create transformation phases with innovation milestones.`)

        prompts.push(`I'm an industry expert. Design revolutionary approach to: "${input}"

Structure as strategic transformation phases.`)

        prompts.push(`Expert needs paradigm-shifting framework for: "${input}"

Break into innovation and transformation stages.`)
      } else if (detail === "comprehensive") {
        prompts.push(`I'm a ${field || "industry"} expert working on: "${input}"

Provide visionary analysis covering disruption, innovation, and market transformation.`)

        prompts.push(`Expert-level comprehensive strategy for: "${input}"

Include paradigm shifts, competitive disruption, and future market positioning.`)

        prompts.push(`Industry expert needs complete transformation framework for: "${input}"

Cover innovation, disruption, competitive moats, and market leadership.`)
      } else {
        // detailed
        prompts.push(`Expert in ${field || "this industry"} seeking detailed transformation strategy for: "${input}"

Focus on innovation, disruption, and market leadership opportunities.`)

        prompts.push(`I'm an industry expert. Detailed visionary approach to: "${input}"

Include cutting-edge techniques and competitive differentiation.`)

        prompts.push(`Expert-level detailed analysis of: "${input}"

Cover innovation opportunities, market disruption, and strategic positioning.`)
      }
    }

    return prompts
  }

  const handleGenerate = () => {
    if (!userInput.trim()) {
      toast({
        title: "Please describe what you want to build",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    setGeneratedPrompts([])

    // Simulate loading delay
    setTimeout(() => {
      try {
        const prompts = generatePromptsLocally(userInput.trim(), category, audience, complexity)

        setGeneratedPrompts(prompts)
        setIsLoading(false)

        toast({
          title: "Success! 🎉",
          description: `Generated ${prompts.length} ${audience || "intermediate"}-level prompts`,
        })
      } catch (error) {
        console.error("Error:", error)
        setIsLoading(false)
        toast({
          title: "Error generating prompts",
          description: "Please try again",
          variant: "destructive",
        })
      }
    }, 1000)
  }

  const copyToClipboard = (text: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          toast({
            title: "Copied! 🎉",
            description: "Prompt copied to clipboard",
          })
        })
        .catch(() => {
          toast({
            title: "Copy failed",
            description: "Please select and copy manually",
            variant: "destructive",
          })
        })
    } else {
      // Fallback for older browsers
      const textArea = document.createElement("textarea")
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      try {
        document.execCommand("copy")
        toast({
          title: "Copied! 🎉",
          description: "Prompt copied to clipboard",
        })
      } catch (err) {
        toast({
          title: "Copy failed",
          description: "Please select and copy manually",
          variant: "destructive",
        })
      }
      document.body.removeChild(textArea)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-200 to-beige-300">
      <div className="container mx-auto px-4 py-12">
        {/* Clean Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-3 bg-indigo-600 rounded-xl shadow-lg">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>
            <div className="text-center">
              <h1 className="text-6xl font-black text-indigo-900 tracking-wider font-mono">AAG</h1>
              <p className="text-lg text-indigo-600 font-medium -mt-2 tracking-wide">AskAndGet</p>
            </div>
          </div>
          <p className="text-xl text-indigo-700 max-w-3xl mx-auto">
            Ask for what you want, get the perfect ChatGPT prompts instantly
          </p>
        </div>

        {/* Main Interface */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-cream-50 shadow-xl border border-beige-300 rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-indigo-600 p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">Describe Your Vision</h2>
              <p className="text-indigo-100">
                Tell us what you want to create and we'll craft the perfect ChatGPT prompts
              </p>
            </div>

            <CardContent className="p-6 space-y-6 bg-gradient-to-b from-cream-50 to-beige-100">
              {/* Main Input */}
              <div className="space-y-3">
                <Label className="text-lg font-semibold text-indigo-900">
                  What would you like to build or achieve?
                </Label>
                <Textarea
                  placeholder="Describe your project in detail...

Examples:
• I want to create a mobile app that helps people track their daily water intake
• I need to write a compelling business proposal for a sustainable fashion startup
• I want to build a personal portfolio website that showcases my photography work
• I need help creating a social media marketing strategy for my bakery business

The more details you provide, the better prompts we can generate!"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="min-h-[200px] text-base p-4 border-2 border-beige-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 rounded-xl resize-none transition-all duration-200 bg-cream-100 text-indigo-900 placeholder:text-indigo-600"
                />
              </div>

              {/* Configuration */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-base font-medium text-indigo-800">Career Field</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="h-12 border-2 border-beige-300 focus:border-indigo-400 rounded-lg bg-cream-100 text-indigo-900">
                      <SelectValue placeholder="Select field" />
                    </SelectTrigger>
                    <SelectContent className="bg-cream-50 border-beige-200">
                      <SelectItem value="technology">💻 Technology</SelectItem>
                      <SelectItem value="healthcare">🏥 Healthcare</SelectItem>
                      <SelectItem value="education">📚 Education</SelectItem>
                      <SelectItem value="finance">💰 Finance</SelectItem>
                      <SelectItem value="marketing">📈 Marketing</SelectItem>
                      <SelectItem value="design">🎨 Design</SelectItem>
                      <SelectItem value="business">💼 Business</SelectItem>
                      <SelectItem value="engineering">⚙️ Engineering</SelectItem>
                      <SelectItem value="legal">⚖️ Legal</SelectItem>
                      <SelectItem value="media">📺 Media</SelectItem>
                      <SelectItem value="sales">🤝 Sales</SelectItem>
                      <SelectItem value="other">🔧 Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-base font-medium text-indigo-800">Experience</Label>
                  <Select value={audience} onValueChange={setAudience}>
                    <SelectTrigger className="h-12 border-2 border-beige-300 focus:border-indigo-400 rounded-lg bg-cream-100 text-indigo-900">
                      <SelectValue placeholder="Your level" />
                    </SelectTrigger>
                    <SelectContent className="bg-cream-50 border-beige-200">
                      <SelectItem value="beginner">🌱 Beginner</SelectItem>
                      <SelectItem value="intermediate">🚀 Intermediate</SelectItem>
                      <SelectItem value="advanced">⭐ Advanced</SelectItem>
                      <SelectItem value="expert">👑 Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-base font-medium text-indigo-800">Detail Level</Label>
                  <Select value={complexity} onValueChange={setComplexity}>
                    <SelectTrigger className="h-12 border-2 border-beige-300 focus:border-indigo-400 rounded-lg bg-cream-100 text-indigo-900">
                      <SelectValue placeholder="Response style" />
                    </SelectTrigger>
                    <SelectContent className="bg-cream-50 border-beige-200">
                      <SelectItem value="simple">⚡ Simple</SelectItem>
                      <SelectItem value="detailed">📝 Detailed</SelectItem>
                      <SelectItem value="comprehensive">📚 Comprehensive</SelectItem>
                      <SelectItem value="step-by-step">🔢 Step-by-Step</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Generate Button */}
              <Button
                onClick={handleGenerate}
                disabled={isLoading}
                className="w-full h-14 text-lg font-semibold bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Generating Your Prompts...
                  </>
                ) : (
                  <>
                    <Send className="mr-3 h-5 w-5" />
                    Generate My Prompts
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          {generatedPrompts.length > 0 && (
            <div className="mt-8 space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-indigo-900 mb-2">Your Optimized Prompts</h3>
                <p className="text-indigo-600">
                  {audience === "beginner" && "Simple, beginner-friendly prompts"}
                  {audience === "expert" && "Expert-level strategic prompts"}
                  {audience === "intermediate" && "Intermediate-level practical prompts"}
                  {audience === "advanced" && "Advanced strategic prompts"}
                  {!audience && "Copy and paste these directly into ChatGPT"}
                </p>
              </div>

              {generatedPrompts.map((prompt, index) => (
                <Card key={index} className="bg-cream-50 shadow-lg border border-beige-200 rounded-xl">
                  <CardHeader className="bg-beige-100 border-b border-beige-200 rounded-t-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge className="bg-indigo-600 text-white px-3 py-1">
                          {audience === "beginner" && "Beginner "}
                          {audience === "expert" && "Expert "}
                          {audience === "advanced" && "Advanced "}
                          {audience === "intermediate" && "Intermediate "}
                          Prompt {index + 1}
                        </Badge>
                        <span className="text-indigo-600 text-sm">
                          {category && `${category.charAt(0).toUpperCase() + category.slice(1)}`}
                          {complexity && ` • ${complexity.charAt(0).toUpperCase() + complexity.slice(1)}`}
                        </span>
                      </div>
                      <Button
                        onClick={() => copyToClipboard(prompt)}
                        variant="outline"
                        size="sm"
                        className="border-indigo-300 text-indigo-600 hover:bg-indigo-50"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="bg-beige-100 rounded-lg p-4 border-l-4 border-indigo-400">
                      <p className="text-indigo-900 whitespace-pre-wrap leading-relaxed text-sm">{prompt}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
