"use client"




import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Save, Plus, Trash2, LogOut } from "lucide-react"

// Simple type definitions based on content.json
type TeamMember = {
    id: string;
    name: string;
    role: string;
    bio: string;
    phone?: string;
    imageUrl: string;
}

type NewsItem = {
    id: string;
    title: string;
    summary: string;
    date: string;
    link: string;
    category: string;
}

type Inquiry = {
    id: string;
    name: string; // CEO Name
    company: string; // Corporation Name
    phone: string; // CEO Contact
    content: string; // Other Content
    checklist: string[]; // Add checklist
    createdAt: string;
}

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [password, setPassword] = useState("")
    const [activeTab, setActiveTab] = useState("team")

    const [team, setTeam] = useState<TeamMember[]>([])
    const [news, setNews] = useState<NewsItem[]>([])
    const [services, setServices] = useState<unknown[]>([])
    const [inquiries, setInquiries] = useState<Inquiry[]>([])

    const [loading, setLoading] = useState(false)

    // Load initial data
    useEffect(() => {
        if (isAuthenticated) {
            import("@/data/content.json").then((data) => {
                setTeam(data.team)
                setNews(data.news)
                setServices(data.services)
            })

            fetch('/api/inquiry')
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) setInquiries(data)
                })
        }
    }, [isAuthenticated])

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        if (password === "admin1234") { // Simple hardcoded password for MVP
            setIsAuthenticated(true)
        } else {
            alert("비밀번호가 틀렸습니다.")
        }
    }

    const handleSave = async () => {
        setLoading(true)
        try {
            const response = await fetch('/api/content', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ team, news, services }),
            });

            if (response.ok) {
                alert("저장되었습니다.")
            } else {
                alert("저장 실패.")
            }
        } catch (error) {
            console.error(error)
            alert("오류가 발생했습니다.")
        } finally {
            setLoading(false)
        }
    }

    // --- Team Handlers ---
    const handleTeamChange = (index: number, field: keyof TeamMember, value: string) => {
        const newTeam = [...team]
        newTeam[index] = { ...newTeam[index], [field]: value }
        setTeam(newTeam)
    }

    // --- News Handlers ---
    const handleNewsChange = (index: number, field: keyof NewsItem, value: string) => {
        const newNews = [...news]
        newNews[index] = { ...newNews[index], [field]: value }
        setNews(newNews)
    }

    const addNewsItem = () => {
        const newItem: NewsItem = {
            id: Date.now().toString(),
            title: "",
            summary: "",
            date: new Date().toISOString().split('T')[0],
            link: "",
            category: "일반"
        }
        setNews([newItem, ...news])
    }

    const removeNewsItem = (index: number) => {
        if (confirm("정말 삭제하시겠습니까?")) {
            const newNews = [...news]
            newNews.splice(index, 1)
            setNews(newNews)
        }
    }

    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-100">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>관리자 로그인</CardTitle>
                        <CardDescription>컨텐츠 관리를 위해 로그인해주세요.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="비밀번호 입력"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                            <Button type="submit" className="w-full">로그인</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-10 px-4 min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">관리자 페이지</h1>
                <div className="flex gap-2">
                    <Button onClick={handleSave} disabled={loading}>
                        <Save className="mr-2 h-4 w-4" />
                        {loading ? "저장 중..." : "변경사항 저장"}
                    </Button>
                    <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
                        <LogOut className="mr-2 h-4 w-4" /> 로그아웃
                    </Button>
                </div>
            </div>

            <div className="flex space-x-4 mb-6 border-b">
                <button
                    className={`pb-2 px-1 ${activeTab === 'team' ? 'border-b-2 border-blue-600 font-bold text-blue-600' : 'text-slate-500'}`}
                    onClick={() => setActiveTab('team')}
                >
                    팀원 관리
                </button>
                <button
                    className={`pb-2 px-1 ${activeTab === 'news' ? 'border-b-2 border-blue-600 font-bold text-blue-600' : 'text-slate-500'}`}
                    onClick={() => setActiveTab('news')}
                >
                    뉴스/블로그 관리
                </button>
                <button
                    className={`pb-2 px-1 ${activeTab === 'inquiries' ? 'border-b-2 border-blue-600 font-bold text-blue-600' : 'text-slate-500'}`}
                    onClick={() => setActiveTab('inquiries')}
                >
                    상담 문의
                </button>
            </div>

            {activeTab === 'team' && (
                <div className="grid gap-6">
                    {team.map((member, index) => (
                        <Card key={member.id}>
                            <CardHeader>
                                <CardTitle>{member.name} ({member.role})</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium mb-1 block">이름</label>
                                        <input
                                            value={member.name}
                                            onChange={(e) => handleTeamChange(index, 'name', e.target.value)}
                                            className="w-full border rounded px-3 py-2 text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium mb-1 block">직책</label>
                                        <input
                                            value={member.role}
                                            onChange={(e) => handleTeamChange(index, 'role', e.target.value)}
                                            className="w-full border rounded px-3 py-2 text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium mb-1 block">연락처</label>
                                        <input
                                            value={member.phone || ''}
                                            onChange={(e) => handleTeamChange(index, 'phone', e.target.value)}
                                            className="w-full border rounded px-3 py-2 text-sm"
                                            placeholder="010-0000-0000"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1 block">약력/소개</label>
                                    <textarea
                                        value={member.bio}
                                        onChange={(e) => handleTeamChange(index, 'bio', e.target.value)}
                                        className="w-full border rounded px-3 py-2 text-sm min-h-[100px]"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1 block">프로필 이미지 URL</label>
                                    <div className="flex gap-2">
                                        <input
                                            value={member.imageUrl}
                                            onChange={(e) => handleTeamChange(index, 'imageUrl', e.target.value)}
                                            className="flex-1 border rounded px-3 py-2 text-sm"
                                            placeholder="/images/..."
                                        />
                                        <div className="relative">
                                            <input
                                                type="file"
                                                id={`upload-${member.id}`}
                                                className="hidden"
                                                accept="image/*"
                                                onChange={async (e) => {
                                                    const file = e.target.files?.[0];
                                                    if (!file) return;

                                                    const formData = new FormData();
                                                    formData.append('file', file);

                                                    try {
                                                        const res = await fetch('/api/upload', {
                                                            method: 'POST',
                                                            body: formData,
                                                        });
                                                        const data = await res.json();
                                                        if (data.success) {
                                                            handleTeamChange(index, 'imageUrl', data.url);
                                                        } else {
                                                            alert('Upload failed: ' + data.message);
                                                        }
                                                    } catch (err) {
                                                        alert('Upload error');
                                                        console.error(err);
                                                    }
                                                }}
                                            />
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => document.getElementById(`upload-${member.id}`)?.click()}
                                                type="button"
                                            >
                                                업로드
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )
            }

            {
                activeTab === 'news' && (
                    <div className="space-y-6">
                        <div className="flex justify-end">
                            <Button onClick={addNewsItem} variant="secondary">
                                <Plus className="mr-2 h-4 w-4" /> 뉴스 추가
                            </Button>
                        </div>
                        {news.map((item, index) => (
                            <Card key={index}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-lg font-medium">
                                        뉴스 #{index + 1}
                                    </CardTitle>
                                    <Button variant="ghost" size="icon" onClick={() => removeNewsItem(index)} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </CardHeader>
                                <CardContent className="space-y-4 mt-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-medium mb-1 block">제목</label>
                                            <input
                                                value={item.title}
                                                onChange={(e) => handleNewsChange(index, 'title', e.target.value)}
                                                className="w-full border rounded px-3 py-2 text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium mb-1 block">카테고리</label>
                                            <input
                                                value={item.category}
                                                onChange={(e) => handleNewsChange(index, 'category', e.target.value)}
                                                className="w-full border rounded px-3 py-2 text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium mb-1 block">요약</label>
                                        <textarea
                                            value={item.summary}
                                            onChange={(e) => handleNewsChange(index, 'summary', e.target.value)}
                                            className="w-full border rounded px-3 py-2 text-sm"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-medium mb-1 block">링크 URL</label>
                                            <input
                                                value={item.link}
                                                onChange={(e) => handleNewsChange(index, 'link', e.target.value)}
                                                className="w-full border rounded px-3 py-2 text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium mb-1 block">날짜</label>
                                            <input
                                                type="date"
                                                value={item.date}
                                                onChange={(e) => handleNewsChange(index, 'date', e.target.value)}
                                                className="w-full border rounded px-3 py-2 text-sm"
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )
            }

            {
                activeTab === 'inquiries' && (
                    <div className="space-y-4">
                        {inquiries.length === 0 ? (
                            <p className="text-muted-foreground text-center py-10">접수된 상담 문의가 없습니다.</p>
                        ) : (
                            inquiries.map((inquiry) => (
                                <Card key={inquiry.id}>
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <CardTitle className="text-lg">{inquiry.name} <span className="text-sm font-normal text-muted-foreground">({inquiry.company})</span></CardTitle>
                                                <CardDescription>{new Date(inquiry.createdAt).toLocaleString()}</CardDescription>
                                            </div>
                                            <div className="font-bold text-blue-600">{inquiry.phone}</div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        {inquiry.checklist && inquiry.checklist.length > 0 && (
                                            <div className="mb-4 bg-slate-50 p-3 rounded-md">
                                                <p className="font-semibold mb-2 text-sm text-slate-700">진단 체크리스트:</p>
                                                <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                                                    {inquiry.checklist.map((item, i) => (
                                                        <li key={i}>{item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        {inquiry.content && (
                                            <div className="bg-blue-50 p-3 rounded-md">
                                                <p className="font-semibold mb-1 text-sm text-blue-800">기타 문의사항:</p>
                                                <p className="whitespace-pre-wrap text-sm text-slate-700">{inquiry.content}</p>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>
                )
            }
        </div >
    )
}
