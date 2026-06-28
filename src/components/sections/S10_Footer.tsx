'use client'
export function S10_Footer() {
  return (
    <footer className="relative z-20 py-16 px-8 md:px-16" style={{ background: '#030509', borderTop: '1px solid rgba(23,189,213,0.08)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0E3A65, #17BDD5, #9E226B, #DC2550)' }}>
                <span className="text-white font-bold text-sm">W</span>
              </div>
              <span className="text-white font-bold text-lg">WHISE</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">Smart Real Estate CRM.<br />Brussels · Since 2003.</p>
          </div>
          {[['Produit',['Lead Management','Portails','Documents','KPIs','IA Advisor']],['Agences',['Bruxelles','Wallonie','Flandre','Grand-Duché','France']],['Contact',['info@whise.eu','+32 2 000 00 00','Avenue Louise, Bruxelles']]].map(([title, items]) => (
            <div key={title as string}>
              <h4 className="text-white text-sm font-semibold mb-4">{title as string}</h4>
              <ul className="flex flex-col gap-2">{(items as string[]).map((item) => <li key={item}><span className="text-slate-500 text-sm">{item}</span></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 gap-4">
          <p className="text-slate-600 text-xs font-mono">© 2024 WHISE — Smart Real Estate CRM · Brussels · BE · Tous droits réservés</p>
          <div className="flex gap-6 text-xs text-slate-600">
            {['Confidentialité','CGU','Cookies'].map((item) => <span key={item} className="hover:text-slate-400 cursor-pointer transition-colors">{item}</span>)}
          </div>
        </div>
      </div>
    </footer>
  )
}
