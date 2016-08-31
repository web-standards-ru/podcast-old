# Выпуск №30. 22 августа 2016

Старьё, мысли про React, SMIL пока можно, скрывать по-новому, Народ.ру на Гитхабе, сайт на 10 КБ, интернет в отпуске.

- Ольга Алексашенко
- Вадим Макеев
- Алексей Симоненко

[Слушайте на SoundCloud](https://soundcloud.com/web-standards/episode-30), [обсуждайте в Слаке](https://web-standards.slack.com/messages/podcast/).

## 00:29 События

- [FrontendFellows №8 в Ижевске 26 августа](https://frontendfellows.timepad.ru/event/357305/)
- [Frontend Union в Вильнюсе 27 августа](http://frontend-union.co/)
- [WSD в Питере 1 октября в ИТМО](https://wsd.events/2016/10/01/)
- [WSD в Минске 29 октября в Space](https://wsd.events/2016/10/29/)
- [HolyJS в Москве 11 декабря](https://habrahabr.ru/company/jugru/blog/307972/)

## 02:24 Зачем чинить старьё

- [Починили `<marquee>` в Safari TP11](https://webkit.org/blog/6883/release-notes-for-safari-technology-preview-release-11/)
- [На сайте РЖД есть `<marquee>`](http://pass.rzd.ru/)
- [Take `<blink>` Back!](https://takeblinkback.com/)

## 07:41 Мысли про React

- [What is React](https://remysharp.com/2016/08/15/what-is-react), Реми Шарп
- [Talked to the lawyers about patents clause…](https://twitter.com/dan_abramov/status/766217157701230593), Дэн Абрамов
- [Сказка о потерянном времени](http://tonsky.livejournal.com/307980.html), Никита Прокопов

## 21:07 SMIL снова можно?

- [Intent to deprecate: SMIL](https://groups.google.com/a/chromium.org/d/msg/blink-dev/5o0yiO440LM/YGEJBsjUAwAJ), Филип Роджерс
- [Гипножаба на SMIL](https://pepelsbey.net/pres/web-in-curves/examples/hypnotoad/)

## 28:23 Скрывать по-новому

- [The proposed box-suppress property](https://rachelandrew.co.uk/archives/2016/07/22/the-proposed-box-suppress-property/), Рейчел Эндрю

## 34:56 Народ.ру на Гитхабе

- [Simpler GitHub Pages publishing](https://github.com/blog/2228-simpler-github-pages-publishing)
- [Википедия про Яндекс.Народ](https://ru.wikipedia.org/wiki/Яндекс.Народ)

## 41:37 Сайт на 10 КБ

- [A List Apart](http://alistapart.com/)
- [Конкурс 10K Apart](https://a-k-apart.com/)
- [CSS1K](http://css1k.net/) и [JS1K](http://js1k.com/)
- [Твиттер @140bytes](https://twitter.com/140bytes)
- [Offline Text Editor in < 140 bytes](https://gist.github.com/addyosmani/d1f3ca715ac902788c2d)

## 46:03 Интернет в отпуске

- [Ой, не фоткай меня…](https://twitter.com/mister_blblbl/status/766371811042947072)

---

**Вадим.** Привет, с вами 30-й выпуск подкаста «Веб-стандарты» и его постоянные ведущие: Алексей Симоненко из HTML Academy. Ольга Алексашенко — верстальщик руками из «Exante».

**Ольга.** И Вадим Макеев из Opera.

**Вадим.** Мы записываемся из [Скалеи](https://ru.wikipedia.org/wiki/%D0%A1%D0%BA%D0%B0%D0%BB%D0%B5%D1%8F), это Италия, Лёша всё ещё в Питере, в общем, у нас вот такой вот отпуск. Поэтому, если вы услышите, не знаю, гудящие Фиаты, смеющихся детей или лающих собак, это нормально, у нас здесь отпуск и надеюсь, что вы тоже отдыхаете.

## 00:26 События

**Вадим.** Немного о событиях. 26 августа, видимо в честь моего дня рождения [FrontendFellows №8]](https://frontendfellows.timepad.ru/event/357305/) пройдёт в Ижевске. Так что приезжайте в Ижевск, если вы поблизости, и я смотрю, FrontendFellows отпусков не берёт и продолжает все свои встречи даже летом.

Уже через неделю будет [Frontend Union в Вильнюсе 27 августа](http://frontend-union.co/), так что увидите нас с Лёшей. Приходите здороваться и, собственно, 31-й выпуск будем записывать уже там.

Но и напоминаю, что мы собираем заявки на доклады для [WSD в Питере 1 октября в ИТМО](https://wsd.events/2016/10/01/) и на [WSD в Минске 29 октября в Space](https://wsd.events/2016/10/29/). Нам уже пришло несколько заявок и туда и сюда, мы на следующей неделе начнём отвечать, общаться с докладчиками, и ещё раз предлагаем вам прислать свои заявки, потому что, даже если [TODO:], а потому, что это правда хорошая площадка, чтобы начать. Так что смелее, ещё отправим рассылку, чтобы вы точно знали, что мы вас ждём с докладами, и просто приходите слушайте конференцию.

И тут ещё HolyJS, которая пройдёт 11 декабря в Москве. Они написали свежий промо-пост [HolyJS в Москве 11 декабря](https://habrahabr.ru/company/jugru/blog/307972/), в котором рассказали про докладчиков: там из самых интересных докладчиков — Аксель Раушмайер — такой крутейший спикер по JavaScript, он там прочтёт киноут. Так что, хотя бы ради Акселя стоит прийти. Ещё забавно, они озвучили цены: там, если вот сейчас прямо купить билеты, вы заплатите четыре тысячи, но останетесь без обеда, а если заплатите шесть тысяч, то тогда вас накормят обедом, а если вы заплатите двенадцать тысяч, то, наверное, вас пустят в джакузи с докладчиками, или что-то там такое, типа ужин, бэкстейдж и всё такое. А если вы будете тупить, то это, в общем-то, будет десять тысяч, двенадцать тысяч, а то и двадцать четыре тысячи. Поэтому, если вы и правда собрались на конференцию, видимо время покупать билеты.
