import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center flex justify-between px-4">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center space-x-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/images/logo.png" alt="YS Honors" className="h-10 w-auto" />
                        <div className="flex flex-col">
                            <span className="text-xl font-bold tracking-tight text-primary leading-none">YS Honors</span>
                            <span className="text-xs text-muted-foreground hidden sm:inline-block">Corporate Consulting</span>
                        </div>
                    </Link>
                </div>
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <Link href="/" className="transition-colors hover:text-primary">홈</Link>
                    <Link href="/team" className="transition-colors hover:text-primary">전문가 소개</Link>
                    <Link href="#services" className="transition-colors hover:text-primary">컨설팅 분야</Link>
                    <Link href="#news" className="transition-colors hover:text-primary">경영 뉴스</Link>
                </nav>
                <div className="flex items-center gap-4">
                    <Link href="/inquiry">
                        <Button size="sm">상담신청</Button>
                    </Link>
                </div>
            </div>
        </header>
    )
}
