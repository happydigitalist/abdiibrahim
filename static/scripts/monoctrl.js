Monocle.Controls.Contents = function (a) {
    if (Monocle.Controls == this) {
        return new Monocle.Controls.Contents(a)
    }
    var c = {
        constructor: Monocle.Controls.Contents
    };
    var b = c.constants = c.constructor;
    var f = c.properties = {
        reader: a
    };

    function e() {
        var h = a.dom.make("div", "controls_contents_container");
        d(h, a.getBook());
        return h
    }

    function d(m, h) {
        while (m.hasChildNodes()) {
            m.removeChild(m.firstChild)
        }
        var l = m.dom.append("ol", "controls_contents_list");
        var k = h.properties.contents;
        for (var j = 0; j < k.length; ++j) {
            g(l, k[j], 0)
        }
    }

    function g(p, o, n) {
        var j = p.childNodes.length;
        var h = p.dom.append("li", "controls_contents_chapter", j);
        var m = h.dom.append("span", "controls_contents_chapterTitle", j, {
            html: o.title
        });
        m.style.paddingLeft = n + "em";
        var l = function () {
            f.reader.skipToChapter(o.src);
            f.reader.hideControl(c)
        };
        Monocle.Events.listenForTap(h, l, "controls_contents_chapter_active");
        if (o.children) {
            for (var k = 0; k < o.children.length; ++k) {
                g(p, o.children[k], n + 1)
            }
        }
    }
    c.createControlElements = e;
    return c
};
Monocle.pieceLoaded("controls/contents");
Monocle.Controls.Magnifier = function (b) {
    if (Monocle.Controls == this) {
        return new Monocle.Controls.Magnifier(b)
    }
    var d = {
        constructor: Monocle.Controls.Magnifier
    };
    var c = d.constants = d.constructor;
    var g = d.properties = {
        buttons: []
    };

    function a() {
        g.reader = b
    }

    function f(i) {
        var h = i.dom.make("div", "controls_magnifier_button");
        h.smallA = h.dom.append("span", "controls_magnifier_a", {
            text: "A"
        });
        h.largeA = h.dom.append("span", "controls_magnifier_A", {
            text: "A"
        });
        g.buttons.push(h);
        Monocle.Events.listenForTap(h, e);
        return h
    }

    function e(h) {
        var l;
        if (!g.sheetIndex) {
            l = [0.3, 1];
            var k = c.RESET_STYLESHEET;
            k += "html body { font-size: " + c.MAGNIFICATION * 100 + "% !important; }";
            g.sheetIndex = g.reader.addPageStyles(k)
        } else {
            l = [1, 0.3];
            g.reader.removePageStyles(g.sheetIndex);
            g.sheetIndex = null
        }
        for (var j = 0; j < g.buttons.length; j++) {
            g.buttons[j].smallA.style.opacity = l[0];
            g.buttons[j].largeA.style.opacity = l[1]
        }
    }
    d.createControlElements = f;
    a();
    return d
};
Monocle.Controls.Magnifier.MAGNIFICATION = 1.15;
Monocle.Controls.Magnifier.RESET_STYLESHEET = "html, body, div, span,p, blockquote, pre,abbr, address, cite, code,del, dfn, em, img, ins, kbd, q, samp,small, strong, sub, sup, var,b, i,dl, dt, dd, ol, ul, li,fieldset, form, label, legend,table, caption, tbody, tfoot, thead, tr, th, td,article, aside, details, figcaption, figure,footer, header, hgroup, menu, nav, section, summary,time, mark { font-size: 100% !important; }h1 { font-size: 2em !important }h2 { font-size: 1.8em !important }h3 { font-size: 1.6em !important }h4 { font-size: 1.4em !important }h5 { font-size: 1.2em !important }h6 { font-size: 1.0em !important }";
Monocle.pieceLoaded("controls/magnifier");
Monocle.Controls.Panel = function () {
    var c = {
        constructor: Monocle.Controls.Panel
    };
    var h = c.constants = c.constructor;
    var b = c.properties = {
        evtCallbacks: {}
    };

    function e(k) {
        b.div = k.dom.make("div", h.CLS.panel);
        b.div.dom.setStyles(h.DEFAULT_STYLES);
        Monocle.Events.listenForContact(b.div, {
            start: a,
            move: f,
            end: g,
            cancel: n
        }, {
            useCapture: false
        });
        return b.div
    }

    function d(k) {
        b.evtCallbacks = k
    }

    function l() {
        b.evtCallbacks = {}
    }

    function a(k) {
        b.contact = true;
        k.m.offsetX += b.div.offsetLeft;
        k.m.offsetY += b.div.offsetTop;
        j();
        i("start", k)
    }

    function f(k) {
        if (!b.contact) {
            return
        }
        i("move", k)
    }

    function g(k) {
        if (!b.contact) {
            return
        }
        Monocle.Events.deafenForContact(b.div, b.listeners);
        m();
        b.contact = false;
        i("end", k)
    }

    function n(k) {
        if (!b.contact) {
            return
        }
        Monocle.Events.deafenForContact(b.div, b.listeners);
        m();
        b.contact = false;
        i("cancel", k)
    }

    function i(o, k) {
        if (b.evtCallbacks[o]) {
            b.evtCallbacks[o](c, k.m.offsetX, k.m.offsetY)
        }
        k.preventDefault()
    }

    function j() {
        if (b.expanded) {
            return
        }
        b.div.dom.addClass(h.CLS.expanded);
        b.expanded = true
    }

    function m(k) {
        if (!b.expanded) {
            return
        }
        b.div.dom.removeClass(h.CLS.expanded);
        b.expanded = false
    }
    c.createControlElements = e;
    c.listenTo = d;
    c.deafen = l;
    c.expand = j;
    c.contract = m;
    return c
};
Monocle.Controls.Panel.CLS = {
    panel: "panel",
    expanded: "controls_panel_expanded"
};
Monocle.Controls.Panel.DEFAULT_STYLES = {
    position: "absolute",
    height: "100%"
};
Monocle.pieceLoaded("controls/panel");
Monocle.Controls.PlaceSaver = function (m) {
    if (Monocle.Controls == this) {
        return new Monocle.Controls.PlaceSaver(m)
    }
    var b = {
        constructor: Monocle.Controls.PlaceSaver
    };
    var d = b.constants = b.constructor;
    var a = b.properties = {};

    function e() {
        c(m)
    }

    function j(k) {
        a.reader = k;
        a.reader.listen("monocle:turn", h);
        a.reader.listen("monocle:bookchange", function (n) {
            c(n.m.book.getMetaData("title"))
        })
    }

    function c(k) {
        a.bkTitle = k.toLowerCase().replace(/[^a-z0-9]/g, "");
        a.prefix = d.COOKIE_NAMESPACE + a.bkTitle + "."
    }

    function l(n, o, r) {
        var k = "";
        if (r) {
            var q = new Date();
            q.setTime(q.getTime() + (r * 24 * 60 * 60 * 1000));
            k = "; expires=" + q.toGMTString()
        }
        var p = "; path=/";
        document.cookie = a.prefix + n + " = " + o + k + p;
        return o
    }

    function g(k) {
        if (!document.cookie) {
            return null
        }
        var n = new RegExp(a.prefix + k + "=(.+?)(;|$)");
        var o = document.cookie.match(n);
        if (o) {
            return o[1]
        } else {
            return null
        }
    }

    function h() {
        var k = a.reader.getPlace();
        l("component", encodeURIComponent(k.componentId()), d.COOKIE_EXPIRES_IN_DAYS);
        l("percent", k.percentageThrough(), d.COOKIE_EXPIRES_IN_DAYS)
    }

    function f() {
        var k = {
            componentId: g("component"),
            percent: g("percent")
        };
        if (k.componentId && k.percent) {
            k.componentId = decodeURIComponent(k.componentId);
            k.percent = parseFloat(k.percent);
            return k
        } else {
            return null
        }
    }

    function i() {
        var k = f();
        if (k) {
            a.reader.moveTo(k)
        }
    }
    b.assignToReader = j;
    b.savedPlace = f;
    b.restorePlace = i;
    e();
    return b
};
Monocle.Controls.PlaceSaver.COOKIE_NAMESPACE = "monocle.controls.placesaver.";
Monocle.Controls.PlaceSaver.COOKIE_EXPIRES_IN_DAYS = 7;
Monocle.pieceLoaded("controls/placesaver");
Monocle.Controls.Scrubber = function (g) {
    if (Monocle.Controls == this) {
        return new Monocle.Controls.Scrubber(g)
    }
    var b = {
        constructor: Monocle.Controls.Scrubber
    };
    var d = b.constants = b.constructor;
    var a = b.properties = {};

    function e() {
        a.reader = g;
        a.reader.listen("monocle:turn", f);
        f()
    }

    function i(k, o) {
        if (!a.componentIds) {
            a.componentIds = a.reader.getBook().properties.componentIds;
            a.componentWidth = 100 / a.componentIds.length
        }
        var m = (k / o.offsetWidth) * 100;
        var l = a.componentIds[Math.floor(m / a.componentWidth)];
        var n = ((m % a.componentWidth) / a.componentWidth);
        return {
            componentId: l,
            percentageThrough: n
        }
    }

    function j(l, n) {
        if (!a.componentIds) {
            a.componentIds = a.reader.getBook().properties.componentIds;
            a.componentWidth = 100 / a.componentIds.length
        }
        var k = a.componentIds.indexOf(l.componentId());
        var m = a.componentWidth * k;
        m += l.percentageThrough() * a.componentWidth;
        return Math.round((m / 100) * n.offsetWidth)
    }

    function f() {
        if (a.hidden || !a.reader.dom.find(d.CLS.container)) {
            return
        }
        var l = a.reader.getPlace();
        var k = j(l, a.reader.dom.find(d.CLS.container));
        var n, m = 0;
        for (var m = 0, n; n = a.reader.dom.find(d.CLS.needle, m); ++m) {
            h(n, k - n.offsetWidth / 2);
            a.reader.dom.find(d.CLS.trail, m).style.width = k + "px"
        }
    }

    function h(l, k) {
        var m = a.reader.dom.find(d.CLS.container);
        k = Math.min(m.offsetWidth - l.offsetWidth, k);
        k = Math.max(k, 0);
        Monocle.Styles.setX(l, k)
    }

    function c(q) {
        var s = q.dom.make("div", d.CLS.container);
        var k = s.dom.append("div", d.CLS.track);
        var r = s.dom.append("div", d.CLS.trail);
        var m = s.dom.append("div", d.CLS.needle);
        var p = s.dom.append("div", d.CLS.bubble);
        var n, t;
        var o = function (z, w) {
            z.preventDefault();
            w = (typeof w == "number") ? w : z.m.registrantX;
            var y = i(w, s);
            h(m, w - m.offsetWidth / 2);
            var A = a.reader.getBook();
            var v = A.chaptersForComponent(y.componentId);
            var C = a.componentIds.indexOf(y.componentId);
            var D = v[Math.floor(v.length * y.percentageThrough)];
            if (C > -1 && A.properties.components[C]) {
                var B = Monocle.Place.FromPercentageThrough(A.properties.components[C], y.percentageThrough);
                D = B.chapterInfo() || D
            }
            if (D) {
                p.innerHTML = D.title
            }
            h(p, w - p.offsetWidth / 2);
            a.lastX = w;
            return y
        };
        var l = function (w) {
            var v = o(w, a.lastX);
            a.reader.moveTo({
                percent: v.percentageThrough,
                componentId: v.componentId
            });
            Monocle.Events.deafenForContact(s, n);
            Monocle.Events.deafenForContact(document.body, t);
            p.style.display = "none"
        };
        var u = function (v) {
            p.style.display = "block";
            o(v);
            n = Monocle.Events.listenForContact(s, {
                move: o
            });
            t = Monocle.Events.listenForContact(document.body, {
                end: l
            })
        };
        Monocle.Events.listenForContact(s, {
            start: u
        });
        return s
    }
    b.createControlElements = c;
    b.updateNeedles = f;
    e();
    return b
};
Monocle.Controls.Scrubber.CLS = {
    container: "controls_scrubber_container",
    track: "controls_scrubber_track",
    needle: "controls_scrubber_needle",
    trail: "controls_scrubber_trail",
    bubble: "controls_scrubber_bubble"
};
Monocle.pieceLoaded("controls/scrubber");
Monocle.Controls.Spinner = function (h) {
    if (Monocle.Controls == this) {
        return new Monocle.Controls.Spinner(h)
    }
    var c = {
        constructor: Monocle.Controls.Spinner
    };
    var g = c.constants = c.constructor;
    var b = c.properties = {
        reader: h,
        divs: [],
        spinCount: 0,
        repeaters: {},
        showForPages: []
    };

    function f(k) {
        var j = k.dom.make("div", "controls_spinner_anim");
        b.divs.push(j);
        return j
    }

    function e(j, l) {
        var k = j;
        b.reader.listen(j, function (m) {
            a(k, m)
        });
        b.reader.listen(l, function (m) {
            i(k, m)
        })
    }

    function d() {
        e("monocle:componentloading", "monocle:componentloaded");
        e("monocle:componentchanging", "monocle:componentchange");
        e("monocle:resizing", "monocle:resize");
        e("monocle:jumping", "monocle:jump");
        e("monocle:recalculating", "monocle:recalculated")
    }

    function a(m, l) {
        m = m || g.GENERIC_LABEL;
        b.repeaters[m] = true;
        b.reader.showControl(c);
        var o = l && l.m && l.m.page ? l.m.page : null;
        if (!o) {
            b.global = true
        }
        for (var n = 0; n < b.divs.length; ++n) {
            var j = b.divs[n].parentNode.parentNode;
            if (o == j) {
                b.showForPages.push(o)
            }
            var k = b.global || b.showForPages.indexOf(o) >= 0;
            b.divs[n].style.display = k ? "block" : "none"
        }
    }

    function i(m, k) {
        m = m || g.GENERIC_LABEL;
        b.repeaters[m] = false;
        for (var j in b.repeaters) {
            if (b.repeaters[j]) {
                return
            }
        }
        b.global = false;
        b.showForPages = [];
        b.reader.hideControl(c)
    }
    c.createControlElements = f;
    c.listenForUsualDelays = d;
    c.spin = a;
    c.spun = i;
    return c
};
Monocle.Controls.Spinner.GENERIC_LABEL = "generic";
Monocle.pieceLoaded("controls/spinner");
Monocle.Controls.Stencil = function (b) {
    if (Monocle.Controls == this) {
        return new this.Stencil(b)
    }
    var s = {
        constructor: Monocle.Controls.Stencil
    };
    var u = s.constants = s.constructor;
    var q = s.properties = {
        reader: b,
        activeComponent: null,
        components: {},
        cutouts: []
    };

    function m(k) {
        q.container = k.dom.make("div", u.CLS.container);
        q.reader.listen("monocle:turn", j);
        q.reader.listen("monocle:stylesheetchange", h);
        q.reader.listen("monocle:resize", h);
        q.reader.listen("monocle:componentchange", function (p) {
            Monocle.defer(h)
        });
        q.reader.listen("monocle:interactive:on", d);
        q.reader.listen("monocle:interactive:off", l);
        q.baseURL = n();
        return q.container
    }

    function h() {
        var p = q.reader.visiblePages()[0];
        var k = v(p);
        q.components[k] = null;
        y(p);
        j()
    }

    function j() {
        var z = q.reader.visiblePages()[0];
        var k = v(z);
        if (!q.components[k]) {
            return
        }
        c(z);
        var A = 0;
        if (!q.disabled) {
            var p = q.components[k];
            if (p && p.length) {
                A = t(z, p)
            }
        }
        while (A < q.cutouts.length) {
            f(A);
            A += 1
        }
    }

    function y(C) {
        var B = v(C);
        q.activeComponent = B;
        var G = C.m.activeFrame.contentDocument;
        var E = e(C);
        if (Monocle.Browser.is.Gecko) {
            E.l = 0
        }
        var z = false;
        if (!q.components[B]) {
            q.components[B] = [];
            z = true
        }
        var p = G.getElementsByTagName("a");
        for (var F = 0; F < p.length; ++F) {
            if (p[F].href) {
                var A = r(p[F].href);
                w(p[F], A, i);
                if (z && p[F].getClientRects) {
                    var k = p[F].getClientRects();
                    for (var D = 0; D < k.length; D++) {
                        q.components[B].push({
                            link: p[F],
                            href: A,
                            left: Math.ceil(k[D].left + E.l),
                            top: Math.ceil(k[D].top),
                            width: Math.floor(k[D].width),
                            height: Math.floor(k[D].height)
                        })
                    }
                }
            }
        }
        return q.components[B]
    }

    function e(k) {
        return {
            l: k.m.offset || 0,
            w: k.m.dimensions.properties.width
        }
    }

    function t(p, k) {
        var C = e(p);
        var A = [];
        for (var z = 0; z < k.length; ++z) {
            if (x(k[z], C.l, C.l + C.w)) {
                A.push(k[z])
            }
        }
        for (z = 0; z < A.length; ++z) {
            if (!q.cutouts[z]) {
                q.cutouts[z] = a()
            }
            var B = q.cutouts[z];
            B.dom.setStyles({
                display: "block",
                left: (A[z].left - C.l) + "px",
                top: A[z].top + "px",
                width: A[z].width + "px",
                height: A[z].height + "px"
            });
            B.relatedLink = A[z].link;
            w(B, A[z].href, g)
        }
        return z
    }

    function w(z, p, k) {
        z.setAttribute("target", "_blank");
        z.deconstructedHref = p;
        if (z.stencilClickHandler) {
            return
        }
        z.stencilClickHandler = k;
        Monocle.Events.listen(z, "click", z.stencilClickHandler)
    }

    function a() {
        var k = q.container.dom.append("a", u.CLS.cutout);
        return k
    }

    function v(k) {
        k = k || q.reader.visiblePages()[0];
        return k.m.activeFrame.m.component.properties.id
    }

    function c(k) {
        cmpt = k.m.activeFrame.parentNode;
        q.container.dom.setStyles({
            top: cmpt.offsetTop + "px",
            left: cmpt.offsetLeft + "px"
        })
    }

    function f(k) {
        q.cutouts[k].dom.setStyles({
            display: "none"
        })
    }

    function x(z, k, p) {
        return z.left >= k && z.left < p
    }

    function o() {
        var k = u.CLS.highlights;
        if (q.container.dom.hasClass(k)) {
            q.container.dom.removeClass(k)
        } else {
            q.container.dom.addClass(k)
        }
    }

    function r(z) {
        var k = {};
        var A = new RegExp("^" + q.baseURL + "([^#]*)(#.*)?$");
        var p = z.match(A);
        if (p) {
            k.componentId = p[1] || v();
            k.hash = p[2] || ""
        } else {
            k.external = z
        }
        return k
    }

    function n() {
        var k = document.createElement("a");
        k.setAttribute("href", "x");
        return k.href.replace(/x$/, "")
    }

    function g(k) {
        var z = k.currentTarget;
        olink = z.relatedLink;
        Monocle.Events.listen(olink, "click", i);
        var p = document.createEvent("MouseEvents");
        p.initMouseEvent("click", true, true, document.defaultView, k.detail, k.screenX, k.screenY, k.screenX, k.screenY, k.ctrlKey, k.altKey, k.shiftKey, k.metaKey, k.which, null);
        try {
            olink.dispatchEvent(p)
        } finally {
            Monocle.Events.deafen(olink, "click", i)
        }
    }

    function i(p) {
        if (p.defaultPrevented) {
            return
        }
        var A = p.currentTarget;
        var z = A.deconstructedHref;
        if (!z) {
            return
        }
        if (z.external) {
            A.href = z.external;
            return
        }
        var k = z.componentId + z.hash;
        q.reader.skipToChapter(k);
        p.preventDefault()
    }

    function d() {
        q.disabled = true;
        j()
    }

    function l() {
        q.disabled = false;
        j()
    }
    s.createControlElements = m;
    s.draw = j;
    s.update = h;
    s.toggleHighlights = o;
    return s
};
Monocle.Controls.Stencil.CLS = {
    container: "controls_stencil_container",
    cutout: "controls_stencil_cutout",
    highlights: "controls_stencil_highlighted"
};
Monocle.pieceLoaded("controls/stencil");
Monocle.pieceLoaded("monoctrl");