'use client'
export function S10_Footer() {
  return (
    <footer className="relative z-20 py-14 px-8 md:px-16" style={{ background: '#030508', borderTop: '1px solid rgba(23,189,213,0.07)' }}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background:'linear-gradient(135deg,#0E3A65,#17BDD5,#9E226B)' }}>
              <span className="text-white font-black text-sm">W</span>
            </div>
            <span className="text-white font-bold text-base">WHISE</span>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed">Smart Real Estate CRM.<br />Brussels · Since 2003.<br />20+ years European PropTech.</p>
        </div>
        {[['Produit',['Lead Management','Portails','Documents','KPIs','IA Advisor']],['Marchés',['Bruxelles','Wallonie','Flandre','Grand-Duché','France']],['Contact',['info@whise.eu','+32 2 000 00 00','Avenue Louise, Bruxelles']]].map(([t,items]) => (
          <div key={t as string}>
            <h4 className="text-white text-sm font-semibold mb-3">{t as string}</h4>
            <ul className="flex flex-col gap-1.5">{(items as string[]).map((item) => <li key={item}><span className="text-slate-500 text-sm">{item}</span></li>)}</ul>
          </div>
        ))}
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-white/5 gap-3">
        <p className="text-slate-700 text-xs font-mono">© 2024 WHISE — Smart Real Estate CRM · Brussels · BE · Tous droits réservés</p>
        <div className="flex gap-5 text-xs text-slate-700">{['Confidentialité','CGU','Cookies'].map((s) => <span key={s} className="hover:text-slate-400 cursor-pointer transition-colors">{s}</span>)}</div>
      </div>
    </footer>
  )
}
