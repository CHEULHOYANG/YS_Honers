import Link from "next/link"

export function Footer() {
    return (
        <footer className="border-t bg-muted/40 text-muted-foreground">
            <div className="container mx-auto py-10 px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold text-foreground mb-4">YS Honors Corporate Consulting</h3>
                        <p className="text-sm leading-6">
                            신뢰의 연결고리, YS 아너스<br />
                            고객사와의 끊어지지 않는 신뢰 관계를 약속합니다.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/" className="hover:text-primary">홈</Link></li>
                            <li><Link href="/team" className="hover:text-primary">전문가 소개</Link></li>
                            <li><a href="https://blog.naver.com/ssneobiz" target="_blank" rel="noopener noreferrer" className="hover:text-primary">블로그</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-foreground mb-4">Contact</h3>
                        <p className="text-sm leading-6">
                            문의: <Link href="/inquiry" className="underline hover:text-primary">상담신청 페이지</Link>를 이용해주세요.<br />
                            관리자 로그인: <Link href="/admin" className="underline hover:text-primary">Admin</Link>
                        </p>
                    </div>
                </div>
                <div className="mt-10 border-t pt-6 text-center text-xs">
                    <p>&copy; {new Date().getFullYear()} YS Honors. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
