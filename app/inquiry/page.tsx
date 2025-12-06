"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2, ArrowRight, X, Check, ArrowLeft } from "lucide-react"
import { Progress } from "@/components/ui/progress"  // Assuming basic Progress exists or I use a simple div

const CHECKLIST_ITEMS = [
    "법인 설립 시 발기인수를 맞추기 위해 타인을 주주로 등록 하셨습니까?",
    "대표이사 가지급금의 적절한 활용 및 처리 문제로 고민하고 계십니까?",
    "누적된 이익잉여금의 효과적인 활용법(급여, 배당)을 고민중이십니까?",
    "자녀에게 가업승계를 준비하고 계십니까?",
    "퇴직금제도 운영으로 안정적인 노후 자금을 마련하고자 하십니까?",
    "중소기업 인증제도(기업부설연구소, 이노비즈 등)를 활용하고 계십니까?",
    "중대재해처벌법, 대비하고 계십니까?",
    "대표님 유고시 발생할 수 있는 리스크헷지 방법에 대해 준비하고 계십니까?",
    "기타"
]

export default function InquiryPage() {
    const [step, setStep] = useState<'intro' | 'checklist' | 'form' | 'success'>('intro')
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [formData, setFormData] = useState({
        corporationName: "",
        ceoName: "",
        ceoContact: "",
        checklist: [] as string[],
        otherContent: ""
    })
    const [loading, setLoading] = useState(false)
    const [direction, setDirection] = useState(0) // -1 for pass, 1 for select

    // Checklist Logic
    const handleDecision = (decision: 'pass' | 'select') => {
        setDirection(decision === 'pass' ? -1 : 1)

        if (decision === 'select') {
            const currentItem = CHECKLIST_ITEMS[currentQuestionIndex]
            setFormData(prev => ({ ...prev, checklist: [...prev.checklist, currentItem] }))
        }

        // Delay slightly for animation to play before switching index
        setTimeout(() => {
            if (currentQuestionIndex < CHECKLIST_ITEMS.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1)
                setDirection(0)
            } else {
                setStep('form')
            }
        }, 300)
    }

    // Form Logic
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await fetch('/api/inquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStep('success')
            } else {
                alert("오류가 발생했습니다. 다시 시도해주세요.")
            }
        } catch (error) {
            console.error(error)
            alert("서버 통신 오류가 발생했습니다.")
        } finally {
            setLoading(false)
        }
    }

    // --- Renders ---

    if (step === 'intro') {
        return (
            <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-900 to-black pointer-events-none"></div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="z-10 text-center max-w-2xl"
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        CEO 자가진단 <span className="text-blue-400">체크리스트</span>
                    </h1>
                    <p className="text-xl text-slate-300 mb-10 leading-relaxed">
                        귀사의 상황에 맞는 맞춤형 솔루션을 위해<br />
                        몇 가지 간단한 질문에 답해주세요.
                    </p>
                    <Button
                        onClick={() => setStep('checklist')}
                        size="lg"
                        className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-10 py-8 text-xl shadow-[0_0_30px_-5px_rgba(37,99,235,0.5)] transition-all hover:scale-105"
                    >
                        진단 시작하기
                    </Button>
                </motion.div>
            </div>
        )
    }

    if (step === 'checklist') {
        const currentItem = CHECKLIST_ITEMS[currentQuestionIndex]
        const progress = ((currentQuestionIndex) / CHECKLIST_ITEMS.length) * 100

        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 overflow-hidden relative">
                <div className="w-full max-w-md absolute top-10 left-1/2 -translate-x-1/2 px-6 z-20">
                    <div className="flex justify-between text-slate-400 text-sm mb-2">
                        <span>진행률</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                <div className="relative w-full max-w-md aspect-[3/4] max-h-[600px] flex items-center justify-center pointer-events-none">
                    <AnimatePresence mode="popLayout">
                        <motion.div
                            key={currentQuestionIndex}
                            initial={{ scale: 0.9, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0, x: 0, rotate: 0 }}
                            exit={{
                                x: direction * 500,
                                opacity: 0,
                                rotate: direction * 45,
                                transition: { duration: 0.3 }
                            }}
                            className="absolute inset-0 pointer-events-auto"
                        >
                            <Card className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 shadow-2xl flex flex-col items-center justify-center p-8 text-center rounded-[2rem]">
                                <CardContent className="flex flex-col items-center justify-between h-full py-10 w-full">
                                    <div className="flex-1 flex items-center justify-center">
                                        <h2 className="text-2xl md:text-3xl font-bold text-white leading-relaxed break-keep">
                                            {currentItem}
                                        </h2>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 w-full mt-10">
                                        <Button
                                            onClick={() => handleDecision('pass')}
                                            variant="outline"
                                            className="h-16 rounded-2xl border-2 border-slate-600 bg-transparent text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-500 text-lg transition-all"
                                        >
                                            <X className="mr-2" />
                                            PASS
                                        </Button>
                                        <Button
                                            onClick={() => handleDecision('select')}
                                            className="h-16 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white border-2 border-blue-600 text-lg shadow-lg shadow-blue-900/50 transition-all hover:scale-105"
                                        >
                                            <Check className="mr-2" />
                                            선택
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        )
    }

    if (step === 'form') {
        const hasOther = formData.checklist.includes("기타")

        return (
            <div className="min-h-screen bg-white py-20 px-4">
                <div className="max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4">진단 결과 제출</h2>
                            <p className="text-muted-foreground w-full">
                                선택하신 {formData.checklist.length}개의 항목에 대한 심층 상담을 위해<br />
                                연락처를 남겨주세요.
                            </p>
                            {/* Selected Items Summary */}
                            {formData.checklist.length > 0 && (
                                <div className="mt-6 flex flex-wrap justify-center gap-2">
                                    {formData.checklist.map((item, i) => (
                                        <span key={i} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                                            #{item === "기타" ? "기타 문의" : item.length > 10 ? item.slice(0, 10) + "..." : item}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Card className="shadow-lg border-slate-100">
                            <CardContent className="p-8 space-y-6">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="corporationName">법인명</Label>
                                        <Input
                                            id="corporationName"
                                            name="corporationName"
                                            placeholder="(주)법인명"
                                            required
                                            value={formData.corporationName}
                                            onChange={handleChange}
                                            className="bg-slate-50 h-12"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="ceoName">대표님 존함</Label>
                                            <Input
                                                id="ceoName"
                                                name="ceoName"
                                                placeholder="홍길동"
                                                required
                                                value={formData.ceoName}
                                                onChange={handleChange}
                                                className="bg-slate-50 h-12"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="ceoContact">연락처</Label>
                                            <Input
                                                id="ceoContact"
                                                name="ceoContact"
                                                placeholder="010-0000-0000"
                                                required
                                                value={formData.ceoContact}
                                                onChange={handleChange}
                                                className="bg-slate-50 h-12"
                                            />
                                        </div>
                                    </div>

                                    {hasOther && (
                                        <div className="space-y-2 animate-in fade-in slide-in-from-top-4">
                                            <Label htmlFor="otherContent" className="text-blue-600 font-semibold">추가 궁금한 사항 (기타)</Label>
                                            <Textarea
                                                id="otherContent"
                                                name="otherContent"
                                                placeholder="궁금한 점을 자유롭게 적어주세요."
                                                className="min-h-[120px] bg-slate-50 resize-none"
                                                required
                                                value={formData.otherContent}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    )}

                                    <div className="pt-4 flex gap-3">
                                        <Button type="button" variant="ghost" onClick={() => {
                                            setStep('checklist')
                                            setCurrentQuestionIndex(0)
                                            setFormData(prev => ({ ...prev, checklist: [] }))
                                        }}>
                                            <ArrowLeft className="mr-2 h-4 w-4" /> 다시 진단하기
                                        </Button>
                                        <Button type="submit" className="flex-1 h-14 text-lg bg-blue-600 hover:bg-blue-700" disabled={loading}>
                                            {loading ? "매칭 분석 중..." : "무료 솔루션 신청하기"}
                                            <ArrowRight className="ml-2" />
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        )
    }

    // Success Step
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center max-w-md"
            >
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                    <CheckCircle2 className="w-12 h-12" />
                </div>
                <h1 className="text-3xl font-bold text-slate-900 mb-4">신청이 완료되었습니다</h1>
                <p className="text-slate-600 mb-8 leading-relaxed">
                    작성해주신 진단 내용을 토대로<br />
                    <strong className="text-slate-900">24시간 이내</strong>에 담당 전문가가 연락드리겠습니다.
                </p>
                <Button onClick={() => window.location.href = '/'} variant="outline" className="w-full h-12">
                    홈으로 돌아가기
                </Button>
            </motion.div>
        </div>
    )
}
