import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowRight, BarChart3, Building2, Users, FileText, TrendingUp, ShieldCheck } from "lucide-react"
import content from "@/data/content.json"

export default function Home() {
    const { services, news } = content

    return (
        <div className="flex flex-col gap-16 pb-16">
            {/* Hero Section */}
            <section className="relative w-full h-[600px] lg:h-[800px] flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{ backgroundImage: "url('/images/hero_bg.png')" }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/90"></div>
                </div>

                <div className="container relative z-10 mx-auto px-4 flex flex-col items-center text-center space-y-8 animate-in fade-in zoom-in duration-1000">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-300 text-sm font-semibold border border-blue-500/30 backdrop-blur-sm mb-4">
                        Premium Corporate Consulting
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white drop-shadow-xl max-w-4xl leading-tight">
                        신뢰의 연결고리<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white">YS Honors</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
                        양철호 & 서은정 두 전문가의 완벽한 협업으로<br />
                        고객사와의 끊어지지 않는 신뢰 관계를 약속합니다.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 pt-8">
                        <Link href="/inquiry">
                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white min-w-[200px] h-14 text-lg rounded-full shadow-lg shadow-blue-900/20 transition-all hover:scale-105">
                                무료 CEO 자가진단 <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Link href="/team">
                            <Button size="lg" variant="outline" className="text-white border-white/30 bg-white/5 hover:bg-white/10 hover:border-white min-w-[200px] h-14 text-lg rounded-full backdrop-blur-md transition-all hover:scale-105">
                                전문가 소개
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Partners Section */}
            <section className="container mx-auto px-4 py-12 border-b">
                <div className="text-center mb-8">
                    <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">With Samsung Financial Networks</p>
                </div>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/samsung_text.png" alt="Samsung" className="h-8 md:h-10 w-auto object-contain" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/samsung_financial.jpg" alt="Samsung Financial Networks" className="h-10 md:h-12 w-auto object-contain" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/samsung_family_office.png" alt="Samsung Family Office" className="h-10 md:h-12 w-auto object-contain" />
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight mb-4">컨설팅 분야</h2>
                    <p className="text-muted-foreground">기업의 생애주기에 맞춘 최적의 솔루션을 제안합니다.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <Card key={service.id} className="group hover:shadow-lg transition-shadow border-slate-200">
                            <CardHeader>
                                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    {service.id === 'consulting' && <Building2 className="h-6 w-6" />}
                                    {service.id === 'finance' && <TrendingUp className="h-6 w-6" />}
                                    {service.id === 'tax' && <ShieldCheck className="h-6 w-6" />}
                                </div>
                                <CardTitle>{service.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base">{service.description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                    {/* Static cards for visual fullness if needed, based on mkbiz tags */}
                    <Card className="group hover:shadow-lg transition-shadow border-slate-200">
                        <CardHeader>
                            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <Users className="h-6 w-6" />
                            </div>
                            <CardTitle>가업승계 전략</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-base">세금 부담을 최소화하고 경영권을 안정적으로 이양하는 전략을 수립합니다.</CardDescription>
                        </CardContent>
                    </Card>
                    <Card className="group hover:shadow-lg transition-shadow border-slate-200">
                        <CardHeader>
                            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <BarChart3 className="h-6 w-6" />
                            </div>
                            <CardTitle>주식 가치 평가</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-base">비상장 주식의 정확한 가치 평가를 통해 이동 및 증여 시점을 분석합니다.</CardDescription>
                        </CardContent>
                    </Card>
                    <Card className="group hover:shadow-lg transition-shadow border-slate-200">
                        <CardHeader>
                            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <FileText className="h-6 w-6" />
                            </div>
                            <CardTitle>기업부설연구소</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-base">연구소 설립 및 벤처 인증을 통한 세액 공제 및 가산점 혜택을 지원합니다.</CardDescription>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Survey Banner */}
            <section className="container mx-auto px-4">
                <div className="bg-slate-900 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-white relative overflow-hidden">
                    <div className="z-10 relative">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">경영 고민, 혼자 고민하지 마세요.</h2>
                        <p className="text-slate-300 mb-6">간단한 설문을 통해 귀사에 꼭 필요한 솔루션을 진단해드립니다.</p>
                        <Link href="/inquiry">
                            <Button variant="default" className="bg-white text-slate-900 hover:bg-slate-100 hover:text-slate-900 border-none font-bold">
                                지금 바로 문의하기
                            </Button>
                        </Link>
                    </div>
                    {/* Decorative circle */}
                    <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                </div>
            </section>

            {/* News Section */}
            <section id="news" className="container mx-auto px-4 bg-slate-50 py-16 rounded-3xl">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight mb-2">경영 인사이트</h2>
                        <p className="text-muted-foreground">블로그의 최신 경영 정보와 세미나 소식을 전해드립니다.</p>
                    </div>
                    <a href="https://blog.naver.com/ssneobiz" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-blue-600 hover:text-blue-700 hidden md:flex items-center">
                        블로그 더보기 <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {news.map((item) => (
                        <a key={item.id} href={item.link} target="_blank" rel="noopener noreferrer" className="block group h-full">
                            <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                                <CardHeader>
                                    <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 w-fit px-2 py-1 rounded">
                                        {item.category}
                                    </div>
                                    <CardTitle className="group-hover:text-blue-600 transition-colors line-clamp-2">{item.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="line-clamp-3 mb-4">{item.summary}</CardDescription>
                                    <p className="text-xs text-muted-foreground mt-auto">{item.date}</p>
                                </CardContent>
                            </Card>
                        </a>
                    ))}
                </div>
            </section>
        </div>
    )
}
