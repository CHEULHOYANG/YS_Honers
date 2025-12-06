"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2 } from "lucide-react"

export default function InquiryPage() {
    const [formData, setFormData] = useState({
        name: "",
        company: "",
        phone: "",
        content: ""
    })
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)

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
                setSubmitted(true)
            } else {
                alert("상담 신청 중 오류가 발생했습니다. 다시 시도해주세요.")
            }
        } catch (error) {
            console.error(error)
            alert("서버 통신 오류가 발생했습니다.")
        } finally {
            setLoading(false)
        }
    }

    if (submitted) {
        return (
            <div className="container mx-auto px-4 py-24 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-8 h-8" />
                </div>
                <h1 className="text-3xl font-bold mb-4">상담 신청이 완료되었습니다.</h1>
                <p className="text-muted-foreground max-w-md mb-8">
                    보내주신 내용은 담당자가 확인 후 빠른 시일 내에 연락드리겠습니다.<br />
                    (평일 기준 24시간 이내)
                </p>
                <Button onClick={() => window.location.href = '/'}>홈으로 돌아가기</Button>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-16 max-w-2xl">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-2">무료 상담 신청</h1>
                <p className="text-muted-foreground">
                    전문가와의 상담을 통해 귀사의 고민을 해결해드립니다.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>상담 정보 입력</CardTitle>
                    <CardDescription>연락처를 정확히 입력해주시면 빠른 상담이 가능합니다.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">성함 (필수)</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="홍길동"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="company">회사명</Label>
                                <Input
                                    id="company"
                                    name="company"
                                    placeholder="(주)YS Honors"
                                    value={formData.company}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">연락처 (필수)</Label>
                            <Input
                                id="phone"
                                name="phone"
                                placeholder="010-1234-5678"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="content">상담 내용 (필수)</Label>
                            <Textarea
                                id="content"
                                name="content"
                                placeholder="고민하고 계신 내용을 간단히 적어주세요. (예: 가업승계 절차, 법인전환 비용 등)"
                                className="min-h-[150px]"
                                required
                                value={formData.content}
                                onChange={handleChange}
                            />
                        </div>

                        <Button type="submit" className="w-full text-lg h-12" disabled={loading}>
                            {loading ? "제출 중..." : "상담 신청하기"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
