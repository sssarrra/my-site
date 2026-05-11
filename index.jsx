<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <title>My Site</title>
  </head>
  <body>
<script type="text/babel">
  
import { useEffect, useState } from "react";

const menuItems = [
  {
    id: "caesar",
    name: "シーザーサラダ",
    ingredients: ["レタス", "トマト", "生ハム", "シーザードレッシング"],
    steps: [
      "レタスを一口大にちぎり、トマトを半分に切る。",
      "レタス、トマト、生ハムをお皿に並べ、ドレッシングを適量かける。",
    ],
  },
  {
    id: "bruschetta",
    name: "生ハムとクリームチーズのブルスケッタ",
    ingredients: ["バゲット", "クリームチーズ", "生ハム", "おろしニンニク", "オリーブオイル"],
    steps: [
      "バゲットを適度に焼き、おろしニンニクとオリーブオイルを適量かける。",
      "その上にクリームチーズを塗り、生ハムをのせる。",
    ],
  },
  {
    id: "potage",
    name: "じゃがいものポタージュ",
    ingredients: ["じゃがいも", "コンソメ", "塩コショウ", "バター", "牛乳"],
    steps: [
      "じゃがいもの皮をむき、適当な大きさに切って15分ほどゆでる。",
      "形が残らないようにつぶす（フードプロセッサーがあればよりなめらかに仕上がる）。",
      "牛乳で伸ばし、コンソメ・塩コショウ・バターで味を調える。",
    ],
  },
  {
    id: "roastbeef",
    name: "ローストビーフ",
    ingredients: ["牛ブロック肉", "おろしニンニク", "黒コショウ", "オリーブオイル", "しょうゆ", "みりん", "砂糖"],
    steps: [
      "肉にフォークで穴をあけ、全体に黒コショウとおろしニンニクをまぶす。",
      "オリーブオイルを敷いたフライパンで全面を30秒ずつ焼く。",
      "ジップロックに肉と適量のオリーブオイルを入れ、空気をしっかり抜く。炊飯器の保温モードで30分ほど放置する。",
      "肉を焼いたフライパンにしょうゆ・みりん・砂糖を2:1:1の割合で入れ、みりんのアルコールを飛ばしてソースを作る。",
      "保温が終わったら適度な厚さに切り、皿に並べてソースをかける。",
    ],
  },
  {
    id: "tartare",
    name: "サーモンとアボカドのタルタル",
    ingredients: ["サーモン（刺身用）", "アボカド", "レモン汁", "マヨネーズ", "しょうゆ", "オリーブオイル"],
    steps: [
      "アボカドを一口大に切り、レモン汁であえておく。",
      "サーモンも一口大に切り、アボカドと合わせる。",
      "マヨネーズ・しょうゆ適量とオリーブオイル少々を加えて混ぜる。",
    ],
  },
];

export default function App() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{
      fontFamily: "'Noto Serif JP', 'Hiragino Mincho ProN', serif",
      background: "#fff",
      minHeight: "100vh",
      color: "#1a1a1a",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;600&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { opacity: 0; animation: fadeUp 0.9s ease forwards; }

        .menu-row {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 18px 12px;
          border-bottom: 1px solid #e8e2d6;
          cursor: pointer;
          border-radius: 8px;
          transition: background 0.2s, border-left 0.2s;
        }
        .menu-row:last-child { border-bottom: none; }
        .menu-row:hover { background: #fdf5ee; }

        .dish-card {
          background: #fff;
          border: 1px solid #e8e2d6;
          border-top: 3px solid #c9845a;
          border-radius: 10px;
          padding: 2rem;
          margin-bottom: 2rem;
          scroll-margin-top: 32px;
        }

        .tag {
          display: inline-block;
          background: #eef6ee;
          color: #3d7045;
          font-size: 12px;
          padding: 4px 10px;
          border-radius: 20px;
          margin: 4px 4px 4px 0;
          letter-spacing: 0.04em;
        }

        .step-num {
          min-width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #c9845a;
          color: #fff;
          font-size: 11px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .section-label {
          display: inline-block;
          font-size: 11px;
          letter-spacing: 0.15em;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 4px;
          margin-bottom: 0.6rem;
        }
        .label-green { background: #eef6ee; color: #3d7045; }
        .label-orange { background: #fdf0e8; color: #a05a2c; }
      `}</style>

      {/* ── Hero ── */}
      <section style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        padding: "2rem 1.5rem",
        background: "#fffdf9",
      }}>
        <h1 className="fade-up" style={{ fontSize:"clamp(22px,5vw,40px)", fontWeight:600, letterSpacing:"0.1em", lineHeight:1.3, whiteSpace:"nowrap", color:"#2a1f14", animationDelay:"0.1s" }}>
          お祝いごとにおすすめごはん
        </h1>
        <div className="fade-up" style={{ width:40, height:3, background:"#c9845a", borderRadius:2, margin:"1.5rem 0 1.25rem", animationDelay:"0.35s" }} />
        <p className="fade-up" style={{ fontSize:15, color:"#7a6655", fontWeight:300, letterSpacing:"0.06em", lineHeight:1.8, animationDelay:"0.5s" }}>
          記念日や大切な日におすすめな献立を紹介します。
        </p>
      </section>

      {/* ── 献立リスト ── */}
      <section style={{ background:"#faf8f4", padding:"5rem 1.5rem" }}>
        <div style={{ maxWidth:560, margin:"0 auto" }}>
          <p style={{ textAlign:"center", fontSize:22, fontWeight:600, letterSpacing:"0.12em", marginBottom:"0.5rem", color:"#2a1f14" }}>献立</p>
          <p style={{ textAlign:"center", fontSize:13, color:"#a08060", marginBottom:"2.5rem" }}>クリックするとレシピへ移動します</p>
          {menuItems.map((item, i) => (
            <div
              key={item.id}
              className="menu-row"
              onClick={() => scrollTo(item.id)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === "Enter" && scrollTo(item.id)}
            >
              <span style={{ fontSize:13, color:"#c9845a", fontWeight:600, minWidth:24 }}>{String(i + 1).padStart(2, "0")}</span>
              <span style={{ fontSize:16, letterSpacing:"0.06em", lineHeight:1.6, flex:1, color:"#2a1f14" }}>・{item.name}</span>
              <span style={{ color:"#c9845a", fontSize:18 }}>›</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 各献立セクション ── */}
      <section style={{ padding:"5rem 1.5rem", background:"#fff" }}>
        <div style={{ maxWidth:560, margin:"0 auto" }}>
          <p style={{ textAlign:"center", fontSize:22, fontWeight:600, letterSpacing:"0.12em", marginBottom:"3rem", color:"#2a1f14" }}>各メニューの詳細</p>
          {menuItems.map((item) => (
            <div key={item.id} id={item.id} className="dish-card">
              <h3 style={{ fontSize:18, fontWeight:600, letterSpacing:"0.06em", marginBottom:"1.5rem", color:"#2a1f14" }}>・{item.name}</h3>

              <div className="section-label label-green">材料</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"6px", marginBottom:"1.75rem" }}>
                {item.ingredients.map((ing) => (
                  <span key={ing} className="tag">{ing}</span>
                ))}
              </div>

              <div className="section-label label-orange">手順</div>
              <ol style={{ paddingLeft:0, margin:0, listStyle:"none" }}>
                {item.steps.map((step, i) => (
                  <li key={i} style={{ display:"flex", gap:"12px", marginBottom:"0.85rem" }}>
                    <span className="step-num">{i + 1}</span>
                    <span style={{ fontSize:14, color:"#3a3028", lineHeight:1.85 }}>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      {/* ── クロージング ── */}
      <section style={{ background:"#faf8f4", padding:"5rem 1.5rem", textAlign:"center" }}>
        <div style={{ maxWidth:480, margin:"0 auto" }}>
          <div style={{ width:32, height:3, background:"#c9845a", borderRadius:2, margin:"0 auto 2rem" }} />
          <p style={{ fontSize:16, fontWeight:400, lineHeight:2.4, letterSpacing:"0.06em", color:"#2a2018" }}>
            どれも簡単に作れるものばかりです。<br />
            特別な日のごはんにぜひお試しください。
          </p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ textAlign:"center", padding:"2rem 1rem", background:"#fff", borderTop:"1px solid #e8e2d6" }}>
        <p style={{ fontSize:12, letterSpacing:"0.15em", color:"#b0a090", fontWeight:300 }}>お祝いごとにおすすめごはん</p>
      </footer>
    </div>
  );
}
</script>
    
</body>
</html>
