import { useState, useRef, useEffect } from “react”;

const FB_URL = “https://www.facebook.com/ravinna.home”;
const WA_URL = “https://wa.me/201066483378”;

const DEFAULT_PRODUCTS = [
{ id: 1, category:“cases”, nameEn:“Clear Series Case”, nameAr:“كفر سلسلة شفافة”, descEn:“Ultra-thin transparent hard case. Fits iPhone 13/14/15.”, descAr:“كفر شفاف رفيع. مناسب لآيفون 13/14/15.”, priceEn:“From 150 LE”, priceAr:“يبدأ من 150 جنيه”, quantity:20, active:true },
{ id: 2, category:“cases”, nameEn:“Matte Series Case”, nameAr:“كفر سلسلة مات”, descEn:“Frosted soft-touch matte finish. Slim grip, full protection.”, descAr:“ناعم مطفي اللون. حماية كاملة بمظهر أنيق.”, priceEn:“From 180 LE”, priceAr:“يبدأ من 180 جنيه”, quantity:15, active:true },
{ id: 3, category:“cases”, nameEn:“Leather Series Case”, nameAr:“كفر سلسلة جلد”, descEn:“Premium PU leather with card slot. Refined classic look.”, descAr:“جلد PU فاخر مع مكان للبطاقات.”, priceEn:“From 220 LE”, priceAr:“يبدأ من 220 جنيه”, quantity:8, active:true },
{ id: 4, category:“cases”, nameEn:“Silicone Series Case”, nameAr:“كفر سلسلة سيليكون”, descEn:“Soft liquid silicone, microfiber-lined. Smooth and grippy.”, descAr:“سيليكون سائل ناعم مع بطانة مخملية.”, priceEn:“From 160 LE”, priceAr:“يبدأ من 160 جنيه”, quantity:12, active:true },
{ id: 5, category:“protectors”, nameEn:“Tempered Glass”, nameAr:“زجاج مقسى”, descEn:“9H hardness, full coverage. Zero bubbles, ultra-clear.”, descAr:“صلابة 9H. تغطية كاملة بدون فقاعات.”, priceEn:“From 80 LE”, priceAr:“يبدأ من 80 جنيه”, quantity:30, active:true },
{ id: 6, category:“protectors”, nameEn:“Privacy Glass”, nameAr:“شاشة برايفسي”, descEn:“Anti-spy tempered glass. Blocks side viewing angles.”, descAr:“زجاج مضاد للتجسس. يمنع الرؤية الجانبية.”, priceEn:“From 100 LE”, priceAr:“يبدأ من 100 جنيه”, quantity:18, active:true },
{ id: 7, category:“protectors”, nameEn:“Matte Anti-Glare Glass”, nameAr:“زجاج مضاد للوهج”, descEn:“Reduces fingerprints and glare. Paper-like writing feel.”, descAr:“يقلل البصمات والوهج. ملمس ورقي ناعم.”, priceEn:“From 95 LE”, priceAr:“يبدأ من 95 جنيه”, quantity:5, active:true },
{ id: 8, category:“protectors”, nameEn:“Bundle — Case + Protector”, nameAr:“عرض — كفر + شاشة حماية”, descEn:“Best value: any case + any screen protector together.”, descAr:“أفضل قيمة: أي كفر + أي شاشة حماية معاً.”, priceEn:“From 220 LE”, priceAr:“يبدأ من 220 جنيه”, quantity:10, active:true },
];

const ADMIN_KEY = “ravinna_admin_pass”;
const PRODUCTS_KEY = “ravinna_products”;

const FbIcon = ({s=20}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
const WaIcon = ({s=20}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>;
const TrashIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>;
const EditIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
const PlusIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const BoxIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>;
const ShieldIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const LogoutIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;
const EyeOn = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
const EyeOff = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>;

const emptyForm = { category:“cases”, nameEn:””, nameAr:””, descEn:””, descAr:””, priceEn:””, priceAr:””, quantity:10, active:true };

export default function RavinnaStore() {
const [lang, setLang] = useState(“en”);
const [page, setPage] = useState(“shop”);
const [cart, setCart] = useState([]);
const [addedIds, setAddedIds] = useState({});
const [showSteps, setShowSteps] = useState(false);
const [payMethod, setPayMethod] = useState(“cod”);
const stepsRef = useRef(null);

const [products, setProducts] = useState([]);
const [loaded, setLoaded] = useState(false);

const [adminView, setAdminView] = useState(false);
const [adminAuth, setAdminAuth] = useState(false);
const [adminPass, setAdminPass] = useState(””);
const [savedPass, setSavedPass] = useState(“ravinna2024”);
const [passError, setPassError] = useState(””);
const [adminTab, setAdminTab] = useState(“products”);

const [editingId, setEditingId] = useState(null);
const [editForm, setEditForm] = useState(emptyForm);
const [addForm, setAddForm] = useState(emptyForm);
const [showAdd, setShowAdd] = useState(false);
const [saveFeedback, setSaveFeedback] = useState(””);
const [changePassMode, setChangePassMode] = useState(false);
const [newPass, setNewPass] = useState(””);
const [confirmPass, setConfirmPass] = useState(””);

const isAr = lang === “ar”;

useEffect(() => {
(async () => {
try {
const r = await window.storage.get(PRODUCTS_KEY);
const p = r ? JSON.parse(r.value) : DEFAULT_PRODUCTS;
setProducts(p);
} catch { setProducts(DEFAULT_PRODUCTS); }
try {
const r2 = await window.storage.get(ADMIN_KEY);
if (r2) setSavedPass(r2.value);
} catch {}
setLoaded(true);
})();
}, []);

const saveProducts = async (p) => {
setProducts(p);
try { await window.storage.set(PRODUCTS_KEY, JSON.stringify(p)); } catch {}
};

const savePass = async (p) => {
setSavedPass(p);
try { await window.storage.set(ADMIN_KEY, p); } catch {}
};

const activeProducts = products.filter(p => p.active);
const cases = activeProducts.filter(p => p.category === “cases”);
const protectors = activeProducts.filter(p => p.category === “protectors”);

const addToCart = (product) => {
if (!cart.find(i => i.id === product.id)) setCart(prev => […prev, product]);
setAddedIds(prev => ({ …prev, [product.id]: true }));
setTimeout(() => setAddedIds(prev => ({ …prev, [product.id]: false })), 1600);
};
const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
const goToCart = () => { setShowSteps(false); setPage(“cart”); setAdminView(false); window.scrollTo({top:0,behavior:“smooth”}); };
const goToShop = () => { setPage(“shop”); setShowSteps(false); setAdminView(false); window.scrollTo({top:0,behavior:“smooth”}); };
const handleConfirm = () => { setShowSteps(true); setTimeout(() => stepsRef.current?.scrollIntoView({behavior:“smooth”,block:“start”}), 80); };
const scrollToProducts = () => { setPage(“shop”); setAdminView(false); setTimeout(() => document.getElementById(“products”)?.scrollIntoView({behavior:“smooth”}), 50); };

const loginAdmin = () => {
if (adminPass === savedPass) { setAdminAuth(true); setPassError(””); setAdminPass(””); }
else { setPassError(isAr ? “كلمة المرور غير صحيحة” : “Incorrect password”); }
};

const logoutAdmin = () => { setAdminAuth(false); setAdminView(false); setAdminTab(“products”); setEditingId(null); setShowAdd(false); setChangePassMode(false); };

const startEdit = (p) => { setEditingId(p.id); setEditForm({…p}); setShowAdd(false); };
const cancelEdit = () => { setEditingId(null); };

const saveEdit = async () => {
const updated = products.map(p => p.id === editingId ? { …editForm, id: editingId } : p);
await saveProducts(updated);
setEditingId(null);
flash(“Saved ✓”);
};

const deleteProduct = async (id) => {
if (!window.confirm(isAr ? “حذف المنتج؟” : “Delete this product?”)) return;
await saveProducts(products.filter(p => p.id !== id));
};

const toggleActive = async (id) => {
await saveProducts(products.map(p => p.id === id ? {…p, active: !p.active} : p));
};

const adjustQty = async (id, delta) => {
await saveProducts(products.map(p => p.id === id ? {…p, quantity: Math.max(0, p.quantity + delta)} : p));
};

const addProduct = async () => {
if (!addForm.nameEn || !addForm.priceEn) { flash(“Fill in English name & price at minimum”, true); return; }
const newP = { …addForm, id: Date.now() };
await saveProducts([…products, newP]);
setAddForm(emptyForm);
setShowAdd(false);
flash(“Product added ✓”);
};

const flash = (msg, err=false) => {
setSaveFeedback(err ? “⚠ “ + msg : “✓ “ + msg);
setTimeout(() => setSaveFeedback(””), 2500);
};

const handleChangePass = async () => {
if (newPass.length < 6) { flash(“Password must be at least 6 characters”, true); return; }
if (newPass !== confirmPass) { flash(“Passwords don’t match”, true); return; }
await savePass(newPass);
setNewPass(””); setConfirmPass(””); setChangePassMode(false);
flash(“Password updated ✓”);
};

const lowStock = products.filter(p => p.active && p.quantity <= 5);
const totalItems = products.filter(p => p.active).length;
const outOfStock = products.filter(p => p.active && p.quantity === 0).length;

const F = ({ label, val, onChange, placeholder, multiline }) => (
<div style={{ marginBottom:10 }}>
<label style={{ display:“block”, fontSize:”.72rem”, color:”#888”, letterSpacing:”.08em”, textTransform:“uppercase”, marginBottom:4 }}>{label}</label>
{multiline
? <textarea value={val} onChange={e=>onChange(e.target.value)} placeholder={placeholder||””} rows={2} style={{ width:“100%”, padding:“9px 11px”, border:“1px solid #e0e0e0”, background:”#fafaf8”, fontFamily:“inherit”, fontSize:”.85rem”, resize:“vertical”, outline:“none” }}/>
: <input value={val} onChange={e=>onChange(e.target.value)} placeholder={placeholder||””} style={{ width:“100%”, padding:“9px 11px”, border:“1px solid #e0e0e0”, background:”#fafaf8”, fontFamily:“inherit”, fontSize:”.85rem”, outline:“none” }}/>
}
</div>
);

const ProductForm = ({ form, setForm, onSave, onCancel, saveLabel }) => (
<div style={{ background:”#fff”, border:“1px solid #ebebeb”, padding:“22px”, marginTop:8 }}>
<div style={{ display:“grid”, gridTemplateColumns:“1fr 1fr”, gap:“14px”, marginBottom:4 }}>
<div>
<p style={{ fontSize:”.7rem”, color:”#aaa”, letterSpacing:”.1em”, textTransform:“uppercase”, marginBottom:10 }}>English</p>
<F label=“Product Name *” val={form.nameEn} onChange={v=>setForm(f=>({…f,nameEn:v}))} />
<F label=“Description” val={form.descEn} onChange={v=>setForm(f=>({…f,descEn:v}))} multiline />
<F label=“Price *” val={form.priceEn} onChange={v=>setForm(f=>({…f,priceEn:v}))} placeholder=“e.g. From 150 LE” />
</div>
<div>
<p style={{ fontSize:”.7rem”, color:”#aaa”, letterSpacing:”.1em”, textTransform:“uppercase”, marginBottom:10 }}>العربية</p>
<F label=“اسم المنتج” val={form.nameAr} onChange={v=>setForm(f=>({…f,nameAr:v}))} />
<F label=“الوصف” val={form.descAr} onChange={v=>setForm(f=>({…f,descAr:v}))} multiline />
<F label=“السعر” val={form.priceAr} onChange={v=>setForm(f=>({…f,priceAr:v}))} placeholder=“مثال: يبدأ من 150 جنيه” />
</div>
</div>
<div style={{ display:“grid”, gridTemplateColumns:“1fr 1fr 1fr”, gap:“14px”, marginTop:6 }}>
<div>
<label style={{ display:“block”, fontSize:”.72rem”, color:”#888”, letterSpacing:”.08em”, textTransform:“uppercase”, marginBottom:4 }}>Category</label>
<select value={form.category} onChange={e=>setForm(f=>({…f,category:e.target.value}))} style={{ width:“100%”, padding:“9px 11px”, border:“1px solid #e0e0e0”, background:”#fafaf8”, fontFamily:“inherit”, fontSize:”.85rem”, outline:“none” }}>
<option value="cases">Phone Cases</option>
<option value="protectors">Screen Protectors</option>
</select>
</div>
<div>
<label style={{ display:“block”, fontSize:”.72rem”, color:”#888”, letterSpacing:”.08em”, textTransform:“uppercase”, marginBottom:4 }}>Quantity</label>
<input type=“number” min=“0” value={form.quantity} onChange={e=>setForm(f=>({…f,quantity:parseInt(e.target.value)||0}))} style={{ width:“100%”, padding:“9px 11px”, border:“1px solid #e0e0e0”, background:”#fafaf8”, fontFamily:“inherit”, fontSize:”.85rem”, outline:“none” }}/>
</div>
<div>
<label style={{ display:“block”, fontSize:”.72rem”, color:”#888”, letterSpacing:”.08em”, textTransform:“uppercase”, marginBottom:4 }}>Visible to Customers</label>
<button onClick={()=>setForm(f=>({…f,active:!f.active}))} style={{ width:“100%”, padding:“9px 11px”, border:`1px solid ${form.active?"#1a1a1a":"#e0e0e0"}`, background:form.active?”#1a1a1a”:”#fafaf8”, color:form.active?”#fff”:”#aaa”, fontFamily:“inherit”, fontSize:”.82rem”, cursor:“pointer”, letterSpacing:”.06em”, transition:“all .2s” }}>
{form.active ? “Visible ✓” : “Hidden”}
</button>
</div>
</div>
<div style={{ display:“flex”, gap:10, marginTop:18, justifyContent:“flex-end” }}>
<button onClick={onCancel} style={{ padding:“9px 20px”, border:“1px solid #ddd”, background:“none”, fontFamily:“inherit”, fontSize:”.8rem”, cursor:“pointer”, color:”#888” }}>Cancel</button>
<button onClick={onSave} style={{ padding:“9px 24px”, border:“none”, background:”#1a1a1a”, color:”#fff”, fontFamily:“inherit”, fontSize:”.8rem”, cursor:“pointer”, letterSpacing:”.08em” }}>{saveLabel||“Save”}</button>
</div>
</div>
);

if (!loaded) return <div style={{ display:“flex”, alignItems:“center”, justifyContent:“center”, height:“100vh”, color:”#aaa”, fontFamily:“inherit” }}>Loading…</div>;

return (
<div dir={isAr?“rtl”:“ltr”} style={{ fontFamily: isAr?”‘Cairo’,‘Segoe UI’,sans-serif”:”‘Cormorant Garamond’,Georgia,serif”, background:”#fafaf8”, color:”#1a1a1a”, minHeight:“100vh” }}>
<style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300&family=Cairo:wght@300;400;600&display=swap'); *{box-sizing:border-box;margin:0;padding:0;} .nb{background:none;border:none;cursor:pointer;font-size:.8rem;letter-spacing:.1em;text-transform:uppercase;color:#777;padding:5px 0;transition:color .2s;font-family:inherit;} .nb:hover{color:#1a1a1a;} .hb{background:#1a1a1a;color:#fff;border:none;cursor:pointer;padding:13px 30px;font-size:.8rem;letter-spacing:.14em;text-transform:uppercase;font-family:inherit;transition:background .2s;} .hb:hover{background:#333;} .lb{background:none;border:1px solid #ddd;cursor:pointer;font-size:.7rem;color:#888;padding:5px 13px;border-radius:20px;transition:all .2s;font-family:inherit;} .lb:hover{border-color:#1a1a1a;color:#1a1a1a;} .pc{background:#fff;border:1px solid #ebebeb;overflow:hidden;transition:box-shadow .2s,transform .2s;} .pc:hover{box-shadow:0 6px 24px rgba(0,0,0,.07);transform:translateY(-2px);} .rb{background:none;border:none;cursor:pointer;color:#ccc;display:flex;align-items:center;gap:4px;font-size:.73rem;font-family:inherit;padding:3px 0;transition:color .2s;} .rb:hover{color:#c0392b;} .cfb{background:#1a1a1a;color:#fff;border:none;cursor:pointer;width:100%;padding:16px;font-size:.83rem;letter-spacing:.1em;text-transform:uppercase;font-family:inherit;transition:background .2s;} .cfb:hover{background:#2d2d2d;} .sc{background:#fff;border:1px solid #ebebeb;padding:22px 20px;} .sn{font-size:2.6rem;font-weight:300;color:#e8e8e6;line-height:1;margin-bottom:12px;font-family:'Cormorant Garamond',serif;} .fi{padding:12px 15px;background:#fff;border:1px solid #e8e8e6;font-size:.86rem;color:#555;display:flex;align-items:center;gap:10px;} .cc{background:#fff;border:1px solid #ebebeb;padding:20px 18px;display:flex;align-items:center;gap:13px;text-decoration:none;color:inherit;transition:box-shadow .2s,transform .2s;} .cc:hover{box-shadow:0 4px 16px rgba(0,0,0,.07);transform:translateY(-2px);} .sr{animation:fsu .4s ease both;} @keyframes fsu{from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);}} .dv{border:none;border-top:1px solid #ebebeb;} .atab{background:none;border:none;border-bottom:2px solid transparent;cursor:pointer;font-family:inherit;font-size:.78rem;letter-spacing:.1em;text-transform:uppercase;padding:8px 0;color:#aaa;transition:all .2s;margin-${isAr?"left":"right"}:20px;} .atab:hover,.atab.active{color:#1a1a1a;border-bottom-color:#1a1a1a;} .qty-btn{background:none;border:1px solid #ddd;width:28px;height:28px;cursor:pointer;font-size:1rem;display:flex;align-items:center;justify-content:center;transition:all .15s;color:#555;} .qty-btn:hover{border-color:#1a1a1a;background:#1a1a1a;color:#fff;} .pay-opt{border:1.5px solid #e0e0e0;padding:16px 18px;cursor:pointer;transition:border-color .2s;background:#fff;} .pay-opt.sel{border-color:#1a1a1a;background:#fafaf8;} .notebar{padding:13px 17px;font-size:.86rem;} @media(max-width:768px){.pg{grid-template-columns:1fr 1fr!important;}.hg{grid-template-columns:1fr!important;}.hp{display:none!important;}.ht{font-size:2.2rem!important;}.sg{grid-template-columns:1fr 1fr!important;}.af{grid-template-columns:1fr!important;}} @media(max-width:500px){.pg{grid-template-columns:1fr!important;}.sg{grid-template-columns:1fr!important;}}`}</style>

```
  {/* ── NAV ── */}
  <nav style={{ position:"sticky",top:0,zIndex:100,background:"rgba(250,250,248,.96)",backdropFilter:"blur(8px)",borderBottom:"1px solid #ebebeb",padding:"0 5vw",display:"flex",alignItems:"center",justifyContent:"space-between",height:"62px" }}>
    <button onClick={goToShop} style={{ background:"none",border:"none",cursor:"pointer",textAlign:isAr?"right":"left" }}>
      <div style={{ fontSize:"1.25rem",fontWeight:500,letterSpacing:".06em" }}>Ravinna</div>
      <div style={{ fontSize:".58rem",color:"#aaa",letterSpacing:".1em",textTransform:"uppercase" }}>{isAr?"توصيل لجميع أنحاء مصر":"Delivered across Egypt"}</div>
    </button>
    <div style={{ display:"flex",gap:"18px",alignItems:"center" }}>
      <button className="nb" onClick={scrollToProducts}>{isAr?"المنتجات":"Products"}</button>
      <button className="nb" onClick={()=>{ setPage("shop"); setTimeout(()=>document.getElementById("cs")?.scrollIntoView({behavior:"smooth"}),50); }}>{isAr?"تواصل":"Contact"}</button>
      <button onClick={goToCart} style={{ background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:6,fontFamily:"inherit" }}>
        <div style={{ position:"relative",display:"inline-flex" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
          {cart.length>0 && <span style={{ position:"absolute",top:-7,right:-8,background:"#1a1a1a",color:"#fff",borderRadius:"50%",width:17,height:17,fontSize:".58rem",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"sans-serif" }}>{cart.length}</span>}
        </div>
        <span style={{ fontSize:".78rem",letterSpacing:".08em",textTransform:"uppercase",color:"#1a1a1a" }}>{isAr?"السلة":"Cart"}</span>
      </button>
      <button className="lb" onClick={() => setLang(lang==="en"?"ar":"en")}>{lang==="en"?"عربي":"EN"}</button>
      <button onClick={()=>{setAdminView(true);setPage("shop");}} style={{ background:"none",border:"1px solid #ddd",cursor:"pointer",display:"flex",alignItems:"center",gap:5,padding:"5px 12px",borderRadius:20,color:"#888",fontFamily:"inherit",fontSize:".7rem",letterSpacing:".06em",transition:"all .2s" }}
        onMouseEnter={e=>{e.currentTarget.style.borderColor="#1a1a1a";e.currentTarget.style.color="#1a1a1a";}}
        onMouseLeave={e=>{e.currentTarget.style.borderColor="#ddd";e.currentTarget.style.color="#888";}}>
        <ShieldIcon/> Admin
      </button>
    </div>
  </nav>

  {/* ══════════ ADMIN PANEL ══════════ */}
  {adminView && (
    <div style={{ maxWidth:"980px",margin:"0 auto",padding:"48px 5vw 60px" }}>
      {!adminAuth ? (
        <div style={{ maxWidth:340,margin:"40px auto" }}>
          <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:28 }}>
            <ShieldIcon/>
            <h2 style={{ fontSize:"1.5rem",fontWeight:300,fontStyle:"italic" }}>Admin Login</h2>
          </div>
          <label style={{ fontSize:".72rem",color:"#888",letterSpacing:".1em",textTransform:"uppercase",display:"block",marginBottom:6 }}>Password</label>
          <input type="password" value={adminPass} onChange={e=>setAdminPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&loginAdmin()} placeholder="Enter admin password" style={{ width:"100%",padding:"11px 14px",border:"1px solid #ddd",background:"#fff",fontFamily:"inherit",fontSize:".9rem",outline:"none",marginBottom:10 }}/>
          {passError && <p style={{ color:"#c0392b",fontSize:".8rem",marginBottom:10 }}>{passError}</p>}
          <button onClick={loginAdmin} style={{ width:"100%",padding:"12px",background:"#1a1a1a",color:"#fff",border:"none",fontFamily:"inherit",fontSize:".82rem",letterSpacing:".1em",cursor:"pointer" }}>Login</button>
          <p style={{ fontSize:".75rem",color:"#bbb",marginTop:12,textAlign:"center" }}>Default password: <code>ravinna2024</code></p>
          <button onClick={()=>setAdminView(false)} style={{ display:"block",margin:"16px auto 0",background:"none",border:"none",cursor:"pointer",color:"#aaa",fontSize:".78rem",fontFamily:"inherit" }}>← Back to store</button>
        </div>
      ) : (
        <>
          {/* Admin header */}
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:28,flexWrap:"wrap",gap:12 }}>
            <div>
              <p style={{ fontSize:".68rem",letterSpacing:".18em",textTransform:"uppercase",color:"#aaa",marginBottom:4 }}>Admin Panel</p>
              <h2 style={{ fontSize:"1.7rem",fontWeight:300,fontStyle:"italic" }}>Ravinna Dashboard</h2>
            </div>
            <div style={{ display:"flex",gap:10,alignItems:"center" }}>
              {saveFeedback && <span style={{ fontSize:".8rem",color: saveFeedback.startsWith("⚠") ? "#c0392b":"#2e7d32",background: saveFeedback.startsWith("⚠")?"#fdecea":"#e8f5e9",padding:"5px 12px" }}>{saveFeedback}</span>}
              <button onClick={goToShop} className="lb">View Store</button>
              <button onClick={logoutAdmin} style={{ background:"none",border:"1px solid #ddd",cursor:"pointer",display:"flex",alignItems:"center",gap:5,padding:"5px 12px",borderRadius:20,color:"#888",fontFamily:"inherit",fontSize:".7rem" }}><LogoutIcon/> Logout</button>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"12px",marginBottom:28 }}>
            {[
              { label:"Total Products", val:totalItems, color:"#f5f5f3" },
              { label:"Low Stock (≤5)", val:lowStock.length, color: lowStock.length>0?"#fff3e0":"#f5f5f3" },
              { label:"Out of Stock", val:outOfStock, color: outOfStock>0?"#fdecea":"#f5f5f3" },
              { label:"Hidden Products", val:products.filter(p=>!p.active).length, color:"#f5f5f3" },
            ].map((s,i) => (
              <div key={i} style={{ background:s.color,padding:"16px 18px" }}>
                <p style={{ fontSize:".68rem",color:"#999",letterSpacing:".1em",textTransform:"uppercase",marginBottom:6 }}>{s.label}</p>
                <p style={{ fontSize:"1.9rem",fontWeight:300,fontFamily:"'Cormorant Garamond',serif" }}>{s.val}</p>
              </div>
            ))}
          </div>

          {/* Low stock alert */}
          {lowStock.length > 0 && (
            <div style={{ background:"#fff8e1",border:"1px solid #ffe082",padding:"12px 16px",marginBottom:20,fontSize:".83rem",color:"#7d6608" }}>
              ⚠ Low stock: {lowStock.map(p=>p.nameEn).join(", ")}
            </div>
          )}

          {/* Tabs */}
          <div style={{ borderBottom:"1px solid #ebebeb",marginBottom:24,display:"flex" }}>
            {["products","add","settings"].map(tab => (
              <button key={tab} className={`atab${adminTab===tab?" active":""}`} onClick={()=>{ setAdminTab(tab); setEditingId(null); setShowAdd(false); }}>
                {tab==="products"?"Products":tab==="add"?"Add Product":"Settings"}
              </button>
            ))}
          </div>

          {/* TAB: Products list */}
          {adminTab==="products" && (
            <div>
              {["cases","protectors"].map(cat => {
                const catProducts = products.filter(p => p.category===cat);
                return (
                  <div key={cat} style={{ marginBottom:36 }}>
                    <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:14 }}>
                      <div style={{ width:3,height:20,background:"#1a1a1a",flexShrink:0 }}/>
                      <h3 style={{ fontSize:"1.1rem",fontWeight:400,fontStyle:"italic" }}>{cat==="cases"?"Phone Cases":"Screen Protectors"}</h3>
                      <span style={{ fontSize:".72rem",color:"#aaa",background:"#f0f0ed",padding:"2px 10px",borderRadius:10 }}>{catProducts.length} items</span>
                    </div>
                    {catProducts.map(p => (
                      <div key={p.id}>
                        <div style={{ background:"#fff",border:"1px solid #ebebeb",padding:"14px 16px",display:"flex",alignItems:"center",gap:14,marginBottom:2,opacity:p.active?1:0.5,transition:"opacity .2s" }}>
                          <div style={{ flex:1,minWidth:0 }}>
                            <div style={{ display:"flex",alignItems:"center",gap:8,flexWrap:"wrap" }}>
                              <p style={{ fontWeight:600,fontSize:".9rem" }}>{p.nameEn}</p>
                              {p.nameAr && <p style={{ fontSize:".8rem",color:"#aaa",direction:"rtl" }}>{p.nameAr}</p>}
                              {!p.active && <span style={{ fontSize:".65rem",background:"#f0f0ed",color:"#888",padding:"1px 8px",borderRadius:10 }}>Hidden</span>}
                              {p.quantity===0 && <span style={{ fontSize:".65rem",background:"#fdecea",color:"#c0392b",padding:"1px 8px",borderRadius:10 }}>Out of stock</span>}
                              {p.quantity>0 && p.quantity<=5 && <span style={{ fontSize:".65rem",background:"#fff3e0",color:"#e65100",padding:"1px 8px",borderRadius:10 }}>Low stock</span>}
                            </div>
                            <p style={{ fontSize:".77rem",color:"#aaa",marginTop:2 }}>{p.priceEn}</p>
                          </div>

                          {/* Quantity controls */}
                          <div style={{ display:"flex",alignItems:"center",gap:6,flexShrink:0 }}>
                            <button className="qty-btn" onClick={()=>adjustQty(p.id,-1)}>−</button>
                            <span style={{ minWidth:28,textAlign:"center",fontSize:".9rem",fontWeight:600 }}>{p.quantity}</span>
                            <button className="qty-btn" onClick={()=>adjustQty(p.id,1)}>+</button>
                            <span style={{ fontSize:".65rem",color:"#bbb",marginLeft:2 }}>qty</span>
                          </div>

                          {/* Actions */}
                          <div style={{ display:"flex",gap:6,flexShrink:0 }}>
                            <button onClick={()=>toggleActive(p.id)} title={p.active?"Hide":"Show"} style={{ background:"none",border:"1px solid #ddd",cursor:"pointer",padding:"5px 8px",color:"#888",display:"flex",alignItems:"center",transition:"all .15s" }}
                              onMouseEnter={e=>{e.currentTarget.style.borderColor="#555";e.currentTarget.style.color="#333";}}
                              onMouseLeave={e=>{e.currentTarget.style.borderColor="#ddd";e.currentTarget.style.color="#888";}}>
                              {p.active ? <EyeOn/> : <EyeOff/>}
                            </button>
                            <button onClick={()=>startEdit(p)} title="Edit" style={{ background:"none",border:"1px solid #ddd",cursor:"pointer",padding:"5px 8px",color:"#888",display:"flex",alignItems:"center",transition:"all .15s" }}
                              onMouseEnter={e=>{e.currentTarget.style.borderColor="#555";e.currentTarget.style.color="#333";}}
                              onMouseLeave={e=>{e.currentTarget.style.borderColor="#ddd";e.currentTarget.style.color="#888";}}>
                              <EditIcon/>
                            </button>
                            <button onClick={()=>deleteProduct(p.id)} title="Delete" style={{ background:"none",border:"1px solid #ddd",cursor:"pointer",padding:"5px 8px",color:"#bbb",display:"flex",alignItems:"center",transition:"all .15s" }}
                              onMouseEnter={e=>{e.currentTarget.style.borderColor="#c0392b";e.currentTarget.style.color="#c0392b";}}
                              onMouseLeave={e=>{e.currentTarget.style.borderColor="#ddd";e.currentTarget.style.color="#bbb";}}>
                              <TrashIcon/>
                            </button>
                          </div>
                        </div>

                        {/* Inline edit form */}
                        {editingId===p.id && (
                          <ProductForm form={editForm} setForm={setEditForm} onSave={saveEdit} onCancel={cancelEdit} saveLabel="Save Changes"/>
                        )}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB: Add product */}
          {adminTab==="add" && (
            <div>
              <h3 style={{ fontSize:"1.2rem",fontWeight:300,fontStyle:"italic",marginBottom:4 }}>Add New Product</h3>
              <p style={{ fontSize:".82rem",color:"#aaa",marginBottom:20 }}>Fill in the details below. Arabic fields are optional but recommended.</p>
              <ProductForm form={addForm} setForm={setAddForm} onSave={addProduct} onCancel={()=>setAddForm(emptyForm)} saveLabel="Add Product"/>
            </div>
          )}

          {/* TAB: Settings */}
          {adminTab==="settings" && (
            <div style={{ maxWidth:400 }}>
              <h3 style={{ fontSize:"1.2rem",fontWeight:300,fontStyle:"italic",marginBottom:20 }}>Settings</h3>
              <div style={{ background:"#fff",border:"1px solid #ebebeb",padding:"22px",marginBottom:16 }}>
                <p style={{ fontWeight:600,fontSize:".9rem",marginBottom:4 }}>Change Admin Password</p>
                <p style={{ fontSize:".8rem",color:"#aaa",marginBottom:14 }}>Use a password you'll remember — min 6 characters.</p>
                {!changePassMode
                  ? <button onClick={()=>setChangePassMode(true)} style={{ padding:"9px 20px",border:"1px solid #ddd",background:"none",fontFamily:"inherit",fontSize:".8rem",cursor:"pointer",color:"#555" }}>Change Password</button>
                  : <>
                      <F label="New Password" val={newPass} onChange={setNewPass} />
                      <F label="Confirm Password" val={confirmPass} onChange={setConfirmPass} />
                      <div style={{ display:"flex",gap:10,marginTop:4 }}>
                        <button onClick={()=>{setChangePassMode(false);setNewPass("");setConfirmPass("");}} style={{ padding:"9px 18px",border:"1px solid #ddd",background:"none",fontFamily:"inherit",fontSize:".8rem",cursor:"pointer",color:"#888" }}>Cancel</button>
                        <button onClick={handleChangePass} style={{ padding:"9px 22px",border:"none",background:"#1a1a1a",color:"#fff",fontFamily:"inherit",fontSize:".8rem",cursor:"pointer" }}>Save Password</button>
                      </div>
                    </>
                }
              </div>
              <div style={{ background:"#fff",border:"1px solid #ebebeb",padding:"22px" }}>
                <p style={{ fontWeight:600,fontSize:".9rem",marginBottom:4 }}>Reset Products</p>
                <p style={{ fontSize:".8rem",color:"#aaa",marginBottom:14 }}>Restore all products to the original defaults. This cannot be undone.</p>
                <button onClick={async()=>{ if(!window.confirm("Reset all products to defaults?")) return; await saveProducts(DEFAULT_PRODUCTS); flash("Products reset to defaults"); }} style={{ padding:"9px 20px",border:"1px solid #e0e0e0",background:"none",fontFamily:"inherit",fontSize:".8rem",cursor:"pointer",color:"#c0392b",borderColor:"#f5c6cb" }}>Reset to Defaults</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )}

  {/* ══════════ SHOP PAGE ══════════ */}
  {!adminView && page==="shop" && (<>
    <section style={{ padding:"75px 5vw 65px",maxWidth:"1200px",margin:"0 auto" }}>
      <div className="hg" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"56px",alignItems:"center" }}>
        <div>
          <p style={{ fontSize:".7rem",letterSpacing:".2em",textTransform:"uppercase",color:"#aaa",marginBottom:14 }}>{isAr?"كفرات وشاشات حماية للآيفون":"iPhone Cases & Screen Protectors"}</p>
          <h1 className="ht" style={{ fontSize:"3rem",fontWeight:300,lineHeight:1.15,marginBottom:20,fontStyle:"italic" }}>{isAr?"احمِ آيفونك بأناقة":"Protect Your iPhone"}</h1>
          <p style={{ fontSize:"1rem",color:"#777",lineHeight:1.75,marginBottom:32,maxWidth:400 }}>{isAr?"كفرات وشاشات حماية مميزة — مختارة بعناية لكل موديلات الآيفون.":"Premium cases and screen protectors — carefully selected for every iPhone model."}</p>
          <button className="hb" onClick={scrollToProducts}>{isAr?"تسوق الآن":"Shop Now"}</button>
        </div>
        <div className="hp" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px" }}>
          {[118,172,152,132].map((h,i) => (
            <div key={i} style={{ background:i%2===0?"#f0f0ed":"#e8e8e5",height:`${h}px`,borderRadius:2,display:"flex",alignItems:"center",justifyContent:"center",color:"#ccc",fontSize:".65rem",letterSpacing:".1em",textTransform:"uppercase" }}>
              {i===0?(isAr?"صورة":"Photo"):""}
            </div>
          ))}
        </div>
      </div>
    </section>

    <hr className="dv"/>

    <section id="products" style={{ padding:"65px 5vw",maxWidth:"1200px",margin:"0 auto" }}>
      {[{key:"cases",label:isAr?"كفرات الهاتف":"Phone Cases",items:cases},{key:"protectors",label:isAr?"شاشات الحماية":"Screen Protectors",items:protectors}].map(cat => (
        cat.items.length === 0 ? null :
        <div key={cat.key} style={{ marginBottom:56 }}>
          <div style={{ display:"flex",alignItems:"center",gap:14,marginBottom:28 }}>
            <div style={{ width:3,height:26,background:"#1a1a1a",borderRadius:2,flexShrink:0 }}/>
            <h2 style={{ fontSize:"1.55rem",fontWeight:300,fontStyle:"italic" }}>{cat.label}</h2>
          </div>
          <div className="pg" style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"16px" }}>
            {cat.items.map(p => {
              const inCart = !!cart.find(i=>i.id===p.id);
              const justAdded = addedIds[p.id];
              const outOf = p.quantity===0;
              return (
                <div key={p.id} className="pc">
                  <div style={{ width:"100%",aspectRatio:"4/3",background:"linear-gradient(135deg,#f5f5f3,#ececea)",display:"flex",alignItems:"center",justifyContent:"center",color:"#ccc",fontSize:".7rem",letterSpacing:".1em",textTransform:"uppercase",position:"relative" }}>
                    {isAr?"صورة المنتج":"Product Photo"}
                    {outOf && <div style={{ position:"absolute",inset:0,background:"rgba(255,255,255,.7)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:".75rem",color:"#c0392b",letterSpacing:".1em",textTransform:"uppercase" }}>{isAr?"نفذ المخزون":"Out of Stock"}</div>}
                  </div>
                  <div style={{ padding:"15px 15px 0" }}>
                    <h3 style={{ fontSize:".92rem",fontWeight:600,marginBottom:5,lineHeight:1.35 }}>{isAr&&p.nameAr?p.nameAr:p.nameEn}</h3>
                    <p style={{ fontSize:".79rem",color:"#999",lineHeight:1.6,marginBottom:10 }}>{isAr&&p.descAr?p.descAr:p.descEn}</p>
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12 }}>
                      <span style={{ fontSize:".92rem",fontWeight:700 }}>{isAr&&p.priceAr?p.priceAr:p.priceEn}</span>
                      <span style={{ fontSize:".63rem",color:"#bbb",letterSpacing:".08em",textTransform:"uppercase" }}>{isAr?"كاش/أونلاين":"COD/Online"}</span>
                    </div>
                  </div>
                  <button disabled={inCart||outOf} onClick={()=>addToCart(p)}
                    style={{ width:"100%",padding:"11px",border:"none",cursor:inCart||outOf?"default":"pointer",fontSize:".75rem",letterSpacing:".1em",textTransform:"uppercase",fontFamily:"inherit",transition:"all .2s",background:outOf?"#f5f5f3":inCart||justAdded?"#e8f5e9":"#1a1a1a",color:outOf?"#bbb":inCart||justAdded?"#2e7d32":"#fff" }}>
                    {outOf?(isAr?"نفذ المخزون":"Out of Stock"):inCart?(isAr?"تمت الإضافة ✓":"Added ✓"):(isAr?"أضف للسلة":"Add to Cart")}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </section>

    <hr className="dv"/>

    <section id="cs" style={{ padding:"65px 5vw",maxWidth:"1200px",margin:"0 auto" }}>
      <h2 style={{ fontSize:"1.8rem",fontWeight:300,fontStyle:"italic",marginBottom:8 }}>{isAr?"تواصل معنا":"Contact Us"}</h2>
      <p style={{ color:"#aaa",marginBottom:32,fontSize:".9rem" }}>{isAr?"متاحون على فيسبوك وواتساب":"We're available on Facebook and WhatsApp"}</p>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"14px",maxWidth:"480px" }}>
        <a href={FB_URL} target="_blank" rel="noopener noreferrer" className="cc">
          <div style={{ width:40,height:40,borderRadius:"50%",background:"#e8f0fe",color:"#1877f2",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}><FbIcon/></div>
          <div><p style={{ fontSize:".65rem",color:"#aaa",letterSpacing:".08em",textTransform:"uppercase",marginBottom:3 }}>Facebook</p><p style={{ fontWeight:700,fontSize:".9rem" }}>ravinna.home</p></div>
        </a>
        <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="cc">
          <div style={{ width:40,height:40,borderRadius:"50%",background:"#e8f5e9",color:"#25D366",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}><WaIcon/></div>
          <div><p style={{ fontSize:".65rem",color:"#aaa",letterSpacing:".08em",textTransform:"uppercase",marginBottom:3 }}>WhatsApp</p><p style={{ fontWeight:700,fontSize:".9rem",direction:"ltr",textAlign:isAr?"right":"left" }}>01066483378</p></div>
        </a>
      </div>
    </section>
  </>)}

  {/* ══════════ CART PAGE ══════════ */}
  {!adminView && page==="cart" && (
    <section style={{ padding:"50px 5vw",maxWidth:"820px",margin:"0 auto" }}>
      <button onClick={goToShop} style={{ background:"none",border:"none",cursor:"pointer",fontSize:".78rem",color:"#aaa",letterSpacing:".06em",marginBottom:28,fontFamily:"inherit" }}>
        {isAr?"← متابعة التسوق":"← Continue Shopping"}
      </button>
      <h2 style={{ fontSize:"1.9rem",fontWeight:300,fontStyle:"italic",marginBottom:24 }}>{isAr?"سلة المشتريات":"Your Cart"}</h2>

      {cart.length===0 ? (
        <div style={{ textAlign:"center",padding:"56px 0",color:"#bbb" }}>
          <p style={{ fontSize:"1rem",marginBottom:20 }}>{isAr?"سلتك فارغة.":"Your cart is empty."}</p>
          <button className="hb" onClick={goToShop}>{isAr?"تسوق الآن":"Shop Now"}</button>
        </div>
      ) : (<>
        <div style={{ display:"flex",flexDirection:"column",gap:"1px",marginBottom:20 }}>
          <div style={{ display:"flex",justifyContent:"space-between",padding:"8px 14px",background:"#f5f5f3" }}>
            <span style={{ fontSize:".65rem",letterSpacing:".12em",textTransform:"uppercase",color:"#aaa" }}>{isAr?"المنتجات المختارة":"Selected Items"}</span>
            <span style={{ fontSize:".65rem",letterSpacing:".12em",textTransform:"uppercase",color:"#aaa" }}>{isAr?"السعر":"Price"}</span>
          </div>
          {cart.map(item => (
            <div key={item.id} style={{ background:"#fff",border:"1px solid #ebebeb",borderTop:"none",padding:"14px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:14 }}>
              <div style={{ flex:1 }}>
                <p style={{ fontWeight:600,fontSize:".88rem",marginBottom:3 }}>{isAr&&item.nameAr?item.nameAr:item.nameEn}</p>
                <p style={{ fontSize:".76rem",color:"#bbb",marginBottom:6 }}>{isAr&&item.descAr?item.descAr:item.descEn}</p>
                <button className="rb" onClick={()=>removeFromCart(item.id)}><TrashIcon/>{isAr?"إزالة":"Remove"}</button>
              </div>
              <p style={{ fontWeight:700,fontSize:".88rem",flexShrink:0 }}>{isAr&&item.priceAr?item.priceAr:item.priceEn}</p>
            </div>
          ))}
        </div>

        {!showSteps && (<>
          <div style={{ marginBottom:18 }}>
            <p style={{ fontSize:".68rem",letterSpacing:".15em",textTransform:"uppercase",color:"#aaa",marginBottom:6 }}>{isAr?"اختر طريقة الدفع":"Choose Payment Method"}</p>
            <p style={{ fontSize:".8rem",color:"#999",marginBottom:14 }}>{isAr?"اختر كيف تريد الدفع قبل التأكيد.":"Select how you'd like to pay before confirming."}</p>
            {[
              { key:"cod", label:isAr?"شحن فقط 100 جنيه + كاش عند الاستلام":"Shipping Only (100 LE) — Pay Product Price on Delivery", tag:isAr?"الأكثر شيوعاً":"Most Popular", desc:isAr?"حوّل 100 جنيه رسوم شحن مقدماً. تدفع سعر المنتج كاش عند التوصيل.":"Transfer 100 LE shipping fee in advance. Product price paid in cash on delivery." },
              { key:"full", label:isAr?"دفع كامل أونلاين":"Pay in Full Online", tag:isAr?"اختياري":"Optional", desc:isAr?"حوّل المبلغ الكامل (سعر المنتج + 100 جنيه شحن) عبر إنستاباي أو أي محفظة إلكترونية. لا كاش عند الاستلام.":"Transfer full amount (product price + 100 LE shipping) via Instapay or any e-wallet. No cash needed on delivery." },
            ].map(opt => (
              <div key={opt.key} className={`pay-opt${payMethod===opt.key?" sel":""}`} onClick={()=>setPayMethod(opt.key)} style={{ marginBottom:10 }}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:5 }}>
                  <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                    <div style={{ width:18,height:18,borderRadius:"50%",border:`2px solid ${payMethod===opt.key?"#1a1a1a":"#ccc"}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                      {payMethod===opt.key && <div style={{ width:8,height:8,borderRadius:"50%",background:"#1a1a1a" }}/>}
                    </div>
                    <span style={{ fontWeight:600,fontSize:".86rem" }}>{opt.label}</span>
                  </div>
                  <span style={{ fontSize:".63rem",background:opt.key==="cod"?"#1a1a1a":"#f0f0ed",color:opt.key==="cod"?"#fff":"#666",padding:"2px 8px",borderRadius:10,letterSpacing:".06em",flexShrink:0,marginLeft:8 }}>{opt.tag}</span>
                </div>
                <p style={{ fontSize:".79rem",color:"#888",lineHeight:1.6,[isAr?"paddingRight":"paddingLeft"]:28 }}>{opt.desc}</p>
                {opt.key==="full" && payMethod==="full" && (
                  <p style={{ fontSize:".76rem",color:"#555",marginTop:8,[isAr?"paddingRight":"paddingLeft"]:28 }}>
                    <strong>{isAr?"طرق الدفع:":"Accepted:"}</strong> Instapay · Vodafone Cash · Orange Cash · Etisalat Cash · Fawry · WE Pay
                  </p>
                )}
              </div>
            ))}
          </div>
          <button className="cfb" onClick={handleConfirm}>{isAr?"تأكيد الاختيار — عرض طريقة الطلب":"Confirm Selection — See How to Order"}</button>
        </>)}

        {showSteps && (
          <div ref={stepsRef} className="sr" style={{ marginTop:48 }}>
            <div style={{ borderTop:"2px solid #1a1a1a",paddingTop:36 }}>
              <p style={{ fontSize:".67rem",letterSpacing:".2em",textTransform:"uppercase",color:"#bbb",marginBottom:8 }}>{isAr?"الخطوات التالية":"Next Steps"}</p>
              <h2 style={{ fontSize:"1.7rem",fontWeight:300,fontStyle:"italic",marginBottom:6 }}>{isAr?"كيف تكمل طلبك":"How to Complete Your Order"}</h2>
              <div style={{ display:"inline-flex",alignItems:"center",gap:7,background:payMethod==="full"?"#e8f5e9":"#f0f0ed",padding:"7px 14px",marginBottom:26,marginTop:8,fontSize:".77rem" }}>
                <span style={{ fontWeight:600,color:payMethod==="full"?"#2e7d32":"#555" }}>
                  {payMethod==="full"?(isAr?"الدفع: دفع كامل أونلاين":"Payment: Full Online"):(isAr?"الدفع: شحن مقدماً + كاش عند الاستلام":"Payment: Shipping Upfront + COD")}
                </span>
              </div>

              <div className="sg" style={{ display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"12px",marginBottom:18 }}>
                {(payMethod==="cod" ? [
                  {n:isAr?"٠١":"01", t:isAr?"ادفع رسوم الشحن 100 جنيه":"Pay 100 LE Shipping Fee", d:isAr?"حوّل 100 جنيه مقدماً عبر إنستاباي أو فودافون كاش أو أي محفظة إلكترونية.":"Transfer 100 LE in advance via Instapay, Vodafone Cash, or any e-wallet."},
                  {n:isAr?"٠٢":"02", t:isAr?"ارسل الإيصال + طلبك":"Send Receipt + Your Order", d:isAr?"أرسل صورة الإيصال ثم المنتجات المطلوبة عبر فيسبوك أو واتساب.":"Send a screenshot of your receipt + your selected product(s) to Facebook or WhatsApp."},
                  {n:isAr?"٠٣":"03", t:isAr?"انتظر التأكيد":"Wait for Confirmation", d:isAr?"فريقنا سيراجع دفعتك ويؤكد لك.":"Our team will review your payment and confirm."},
                  {n:isAr?"٠٤":"04", t:isAr?"أرسل بيانات التوصيل":"Provide Delivery Address", d:isAr?"بعد التأكيد أرسل اسمك وعنوانك ورقمك.":"Once confirmed, send your name, address, and phone number."},
                ] : [
                  {n:isAr?"٠١":"01", t:isAr?"ادفع المبلغ الكامل أونلاين":"Pay Full Amount Online", d:isAr?"حوّل إجمالي المبلغ (سعر المنتج + 100 جنيه شحن) عبر إنستاباي أو فودافون كاش أو فوري.":"Transfer the full total (product price + 100 LE shipping) via Instapay, Vodafone Cash, or Fawry."},
                  {n:isAr?"٠٢":"02", t:isAr?"ارسل الإيصال + طلبك":"Send Receipt + Your Order", d:isAr?"أرسل صورة إيصال الدفع الكامل ثم المنتجات المطلوبة.":"Send screenshot of full payment receipt + your selected products."},
                  {n:isAr?"٠٣":"03", t:isAr?"انتظر التأكيد":"Wait for Confirmation", d:isAr?"فريقنا سيؤكد الدفع الكامل. لا حاجة لكاش عند الاستلام.":"Our team confirms full payment. No cash needed on delivery."},
                  {n:isAr?"٠٤":"04", t:isAr?"أرسل بيانات التوصيل":"Provide Delivery Address", d:isAr?"بعد التأكيد أرسل اسمك وعنوانك ورقمك.":"Once confirmed, send your name, address, and phone number."},
                ]).map((s,i) => (
                  <div key={i} className="sc">
                    <div className="sn">{s.n}</div>
                    <h3 style={{ fontSize:".9rem",fontWeight:700,marginBottom:7 }}>{s.t}</h3>
                    <p style={{ fontSize:".8rem",color:"#888",lineHeight:1.65 }}>{s.d}</p>
                  </div>
                ))}
              </div>

              <div className="notebar" style={{ marginBottom:30,background:payMethod==="full"?"#e8f5e9":"#f0f0ed",borderLeft:isAr?"none":`3px solid #1a1a1a`,borderRight:isAr?`3px solid #1a1a1a`:"none" }}>
                {payMethod==="full"?(isAr?"✅ تم الدفع الكامل أونلاين — لا حاجة لكاش عند الاستلام.":"✅ Full payment online — no cash needed on delivery."):(isAr?"💬 سعر المنتج يُدفع كاش عند التوصيل — فقط الشحن (100 جنيه) مقدماً.":"💬 Product price paid Cash on Delivery — only shipping (100 LE) upfront.")}
              </div>

              <p style={{ fontSize:".7rem",letterSpacing:".12em",textTransform:"uppercase",color:"#aaa",marginBottom:12 }}>{isAr?"ارسل إيصالك وطلبك إلى:":"Send your receipt & order to:"}</p>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"11px",marginBottom:36,maxWidth:420 }}>
                <a href={FB_URL} target="_blank" rel="noopener noreferrer" className="cc" style={{ padding:"16px 18px" }}>
                  <div style={{ width:36,height:36,borderRadius:"50%",background:"#e8f0fe",color:"#1877f2",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}><FbIcon s={16}/></div>
                  <div><p style={{ fontSize:".63rem",color:"#bbb",letterSpacing:".07em",textTransform:"uppercase" }}>{isAr?"فيسبوك":"Facebook"}</p><p style={{ fontWeight:700,fontSize:".86rem" }}>ravinna.home</p></div>
                </a>
                <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="cc" style={{ padding:"16px 18px" }}>
                  <div style={{ width:36,height:36,borderRadius:"50%",background:"#e8f5e9",color:"#25D366",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}><WaIcon s={16}/></div>
                  <div><p style={{ fontSize:".63rem",color:"#bbb",letterSpacing:".07em",textTransform:"uppercase" }}>{isAr?"واتساب":"WhatsApp"}</p><p style={{ fontWeight:700,fontSize:".86rem",direction:"ltr",textAlign:isAr?"right":"left" }}>01066483378</p></div>
                </a>
              </div>

              <h3 style={{ fontSize:"1.1rem",fontWeight:400,fontStyle:"italic",marginBottom:5 }}>{isAr?"بيانات التوصيل التي ستُرسل لنا":"Delivery Details to Send Us"}</h3>
              <p style={{ color:"#bbb",fontSize:".8rem",marginBottom:14 }}>{isAr?"بعد التأكيد، أرسل لنا المعلومات التالية:":"After confirmation, share the following:"}</p>
              <div style={{ display:"flex",flexDirection:"column",gap:"7px",maxWidth:460 }}>
                {[isAr?"الاسم الكامل / Full Name":"Full Name / الاسم الكامل",isAr?"عنوان التوصيل / Delivery Address":"Delivery Address / عنوان التوصيل",isAr?"رقم الهاتف / Phone Number":"Phone Number / رقم الهاتف",isAr?"رقم بديل (اختياري) / Alternative Phone":"Alternative Phone (optional) / رقم بديل (اختياري)"].map((f,i) => (
                  <div key={i} className="fi">
                    <span style={{ width:22,height:22,background:"#1a1a1a",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:".65rem",flexShrink:0,borderRadius:2 }}>{i+1}</span>{f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </>)}
    </section>
  )}

  <footer style={{ borderTop:"1px solid #ebebeb",padding:"20px 5vw",display:"flex",justifyContent:"space-between",alignItems:"center",background:"#fff",marginTop:40 }}>
    <span style={{ fontWeight:500,fontSize:".9rem",letterSpacing:".06em" }}>Ravinna</span>
    <span style={{ fontSize:".67rem",color:"#ccc" }}>{isAr?"© 2024 رافينا. جميع الحقوق محفوظة.":"© 2024 Ravinna. All rights reserved."}</span>
  </footer>
</div>
```

);
}
