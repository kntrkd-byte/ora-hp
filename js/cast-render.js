// cast.json の内容をここに直接埋め込み（file://でも動作する）
const CAST_DATA = [
  { id:1, name:"あかね", catch:"笑顔と話術で場を彩ります", img:"" },
  { id:2, name:"みこ",   catch:"上質な時間をともに",        img:"" },
  { id:3, name:"れな",   catch:"あなたの夜をもっと輝かせたい", img:"" },
  { id:4, name:"さくら", catch:"洗練された会話で特別な一夜を", img:"" },
  { id:5, name:"ゆい",   catch:"いつも笑顔でお待ちしています", img:"" },
  { id:6, name:"なな",   catch:"あなただけの特別な時間を",  img:"" },
];

async function fetchCast() {
  try {
    const res = await fetch('data/cast.json');
    if (!res.ok) throw new Error();
    return res.json();
  } catch {
    return CAST_DATA;
  }
}

function castCardHTML(cast) {
  const photo = cast.img
    ? `<img src="${cast.img}" alt="${cast.name}">`
    : `<div class="cast-photo-placeholder">PHOTO</div>`;
  return `
    <article class="cast-card fade-in">
      <div class="cast-photo">${photo}</div>
      <div class="cast-info">
        <p class="cast-name">${cast.name}</p>
        <p class="cast-catch">${cast.catch}</p>
      </div>
    </article>`;
}

async function renderCastPreview(containerId, limit = 4) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const casts = await fetchCast();
  el.innerHTML = casts.slice(0, limit).map(castCardHTML).join('');
}

async function renderCastAll(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const casts = await fetchCast();
  el.innerHTML = casts.map(castCardHTML).join('');
}
