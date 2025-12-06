import content from "@/data/content.json"
import { Card, CardContent, CardHeader } from "@/components/ui/card"


export default function TeamPage() {
    const { team } = content

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold tracking-tight mb-4">전문가 소개</h1>
                <p className="text-lg text-muted-foreground">
                    대한민국 최고의 컨설팅 전문가들이 귀사와 함께합니다.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                {team.map((member) => (
                    <div key={member.id} className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100">
                        <div className="h-2 bg-blue-600 w-full"></div>
                        <div className="p-8">
                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                <div className="w-32 h-32 rounded-full bg-slate-200 shrink-0 overflow-hidden border-4 border-slate-50 flex items-center justify-center">
                                    {/* Placeholder Image Logic */}
                                    {member.imageUrl.includes('placeholder') ? (
                                        <span className="text-4xl font-bold text-slate-400">{member.name[0]}</span>
                                    ) : (
                                        <>
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
                                        </>
                                    )}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900">{member.name}</h2>
                                    <p className="text-blue-600 font-medium mb-1">{member.role}</p>
                                    <p className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-1">
                                        <span className="text-muted-foreground font-normal">Contact:</span> {member.phone}
                                    </p>
                                    <p className="text-slate-600 leading-relaxed whitespace-pre-line text-sm">
                                        {member.bio}
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Extended Career / Bio Section specifically for these high profile members if needed */}
                        <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 flex gap-2 flex-wrap">
                            {member.name.includes("양철호") && (
                                <>
                                    <span className="px-2 py-1 bg-white border rounded text-xs text-slate-500">삼성SDS 33년</span>
                                    <span className="px-2 py-1 bg-white border rounded text-xs text-slate-500">IT/회계/보안</span>
                                    <span className="px-2 py-1 bg-white border rounded text-xs text-slate-500">국방부 LMS</span>
                                </>
                            )}
                            {member.name.includes("서은정") && (
                                <>
                                    <span className="px-2 py-1 bg-white border rounded text-xs text-slate-500">금융경력 20년</span>
                                    <span className="px-2 py-1 bg-white border rounded text-xs text-slate-500">삼성생명/화재</span>
                                    <span className="px-2 py-1 bg-white border rounded text-xs text-slate-500">M&A 전문가</span>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
