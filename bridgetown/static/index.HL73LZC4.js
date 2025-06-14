(() => {
    var Bo = (o, t, e) =>
        t in o
            ? Object.defineProperty(o, t, {
                enumerable: true,
                configurable: true,
                writable: true,
                value: e,
            })
            : (o[t] = e)
    var Et = (o =>
        typeof require < "u"
            ? require
            : typeof Proxy < "u"
                ? new Proxy(o, { get: (t, e) => (typeof require < "u" ? require : t)[e] })
                : o)(function (o) {
                    if (typeof require < "u") return require.apply(this, arguments)
                    throw Error('Dynamic require of "' + o + '" is not supported')
                })
    var qn = (o, t) => () => (t || o((t = { exports: {} }).exports, t), t.exports),
        J = (o, t) => {
            for (var e in t) Object.defineProperty(o, e, { get: t[e], enumerable: true })
        },
        Uo = (o, t, e, n) => {
            if ((t && typeof t == "object") || typeof t == "function")
                for (let i of Object.getOwnPropertyNames(t))
                    !Object.prototype.hasOwnProperty.call(o, i) &&
                        i !== e &&
                        Object.defineProperty(o, i, {
                            get: () => t[i],
                            enumerable: !(n = Object.getOwnPropertyDescriptor(t, i)) || n.enumerable,
                        })
            return o
        }
    var Pt = (o, t, e) => (
        (e = o != null ? Object.create(Object.getPrototypeOf(o)) : {}),
        Uo(t || !o || !o.__esModule ? Object.defineProperty(e, "default", { value: o, enumerable: true }) : e, o)
    )
    var R = (o, t, e) => (Bo(o, typeof t != "symbol" ? t + "" : t, e), e)
    var Ze = qn(Re => {
        ; (function () {
            "use strict"
            class o {
                constructor() {
                    this.init()
                }
                init() {
                    var a = this || t
                    return (
                        (a._counter = 1e3),
                        (a._html5AudioPool = []),
                        (a.html5PoolSize = 10),
                        (a._codecs = {}),
                        (a._howls = []),
                        (a._muted = false),
                        (a._volume = 1),
                        (a._canPlayEvent = "canplaythrough"),
                        (a._navigator = typeof window < "u" && window.navigator ? window.navigator : null),
                        (a.masterGain = null),
                        (a.noAudio = false),
                        (a.usingWebAudio = true),
                        (a.autoSuspend = true),
                        (a.ctx = null),
                        (a.autoUnlock = true),
                        a._setup(),
                        a
                    )
                }
                volume(a) {
                    var r = this || t
                    if (((a = parseFloat(a)), r.ctx || m(), typeof a < "u" && a >= 0 && a <= 1)) {
                        if (((r._volume = a), r._muted)) return r
                        r.usingWebAudio && r.masterGain.gain.setValueAtTime(a, t.ctx.currentTime)
                        for (var d = 0; d < r._howls.length; d++)
                            if (!r._howls[d]._webAudio)
                                for (var u = r._howls[d]._getSoundIds(), p = 0; p < u.length; p++) {
                                    var f = r._howls[d]._soundById(u[p])
                                    f && f._node && (f._node.volume = f._volume * a)
                                }
                        return r
                    }
                    return r._volume
                }
                mute(a) {
                    var r = this || t
                    r.ctx || m(),
                        (r._muted = a),
                        r.usingWebAudio && r.masterGain.gain.setValueAtTime(a ? 0 : r._volume, t.ctx.currentTime)
                    for (var d = 0; d < r._howls.length; d++)
                        if (!r._howls[d]._webAudio)
                            for (var u = r._howls[d]._getSoundIds(), p = 0; p < u.length; p++) {
                                var f = r._howls[d]._soundById(u[p])
                                f && f._node && (f._node.muted = a ? true : f._muted)
                            }
                    return r
                }
                stop() {
                    for (var a = this || t, r = 0; r < a._howls.length; r++) a._howls[r].stop()
                    return a
                }
                unload() {
                    for (var a = this || t, r = a._howls.length - 1; r >= 0; r--) a._howls[r].unload()
                    return (
                        a.usingWebAudio && a.ctx && typeof a.ctx.close < "u" && (a.ctx.close(), (a.ctx = null), m()), a
                    )
                }
                codecs(a) {
                    return (this || t)._codecs[a.replace(/^x-/, "")]
                }
                _setup() {
                    var a = this || t
                    if (((a.state = (a.ctx && a.ctx.state) || "suspended"), a._autoSuspend(), !a.usingWebAudio))
                        if (typeof Audio < "u")
                            try {
                                var r = new Audio()
                                typeof r.oncanplaythrough > "u" && (a._canPlayEvent = "canplay")
                            } catch {
                                a.noAudio = true
                            }
                        else a.noAudio = true
                    try {
                        var r = new Audio()
                        r.muted && (a.noAudio = true)
                    } catch { }
                    return a.noAudio || a._setupCodecs(), a
                }
                _setupCodecs() {
                    var a = this || t, r = null
                    try {
                        r = typeof Audio < "u" ? new Audio() : null
                    } catch {
                        return a
                    }
                    if (!r || typeof r.canPlayType != "function") return a
                    var d = r.canPlayType("audio/mpeg;").replace(/^no$/, ""), u = a._navigator ? a._navigator.userAgent : "", p = u.match(/OPR\/(\d+)/g), f = p && parseInt(p[0].split("/")[1], 10) < 33, Q = u.indexOf("Safari") !== -1 && u.indexOf("Chrome") === -1, b = u.match(/Version\/(.*?) /), g = Q && b && parseInt(b[1], 10) < 15
                    return (
                        (a._codecs = {
                            mp3: !!(!f && (d || r.canPlayType("audio/mp3;").replace(/^no$/, ""))),
                            mpeg: !!d,
                            opus: !!r.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""),
                            ogg: !!r.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
                            oga: !!r.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
                            wav: !!(r.canPlayType('audio/wav; codecs="1"') || r.canPlayType("audio/wav")).replace(
                                /^no$/,
                                ""
                            ),
                            aac: !!r.canPlayType("audio/aac;").replace(/^no$/, ""),
                            caf: !!r.canPlayType("audio/x-caf;").replace(/^no$/, ""),
                            m4a: !!(
                                r.canPlayType("audio/x-m4a;") ||
                                r.canPlayType("audio/m4a;") ||
                                r.canPlayType("audio/aac;")
                            ).replace(/^no$/, ""),
                            m4b: !!(
                                r.canPlayType("audio/x-m4b;") ||
                                r.canPlayType("audio/m4b;") ||
                                r.canPlayType("audio/aac;")
                            ).replace(/^no$/, ""),
                            mp4: !!(
                                r.canPlayType("audio/x-mp4;") ||
                                r.canPlayType("audio/mp4;") ||
                                r.canPlayType("audio/aac;")
                            ).replace(/^no$/, ""),
                            weba: !!(!g && r.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")),
                            webm: !!(!g && r.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")),
                            dolby: !!r.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/, ""),
                            flac: !!(r.canPlayType("audio/x-flac;") || r.canPlayType("audio/flac;")).replace(
                                /^no$/,
                                ""
                            ),
                        }),
                        a
                    )
                }
                _unlockAudio() {
                    var a = this || t
                    if (!(a._audioUnlocked || !a.ctx)) {
                        ; (a._audioUnlocked = false),
                            (a.autoUnlock = false),
                            !a._mobileUnloaded && a.ctx.sampleRate !== 44100 && ((a._mobileUnloaded = true), a.unload()),
                            (a._scratchBuffer = a.ctx.createBuffer(1, 1, 22050))
                        var r = function (d) {
                            for (; a._html5AudioPool.length < a.html5PoolSize;)
                                try {
                                    var u = new Audio(); (u._unlocked = true), a._releaseHtml5Audio(u)
                                } catch {
                                    a.noAudio = true
                                    break
                                }
                            for (var p = 0; p < a._howls.length; p++)
                                if (!a._howls[p]._webAudio)
                                    for (var f = a._howls[p]._getSoundIds(), Q = 0; Q < f.length; Q++) {
                                        var b = a._howls[p]._soundById(f[Q])
                                        b && b._node && !b._node._unlocked && ((b._node._unlocked = true), b._node.load())
                                    }
                            a._autoResume()
                            var g = a.ctx.createBufferSource(); (g.buffer = a._scratchBuffer),
                                g.connect(a.ctx.destination),
                                typeof g.start > "u" ? g.noteOn(0) : g.start(0),
                                typeof a.ctx.resume == "function" && a.ctx.resume(),
                                (g.onended = function () {
                                    g.disconnect(0),
                                        (a._audioUnlocked = true),
                                        document.removeEventListener("touchstart", r, true),
                                        document.removeEventListener("touchend", r, true),
                                        document.removeEventListener("click", r, true),
                                        document.removeEventListener("keydown", r, true)
                                    for (var B = 0; B < a._howls.length; B++) a._howls[B]._emit("unlock")
                                })
                        }
                        return (
                            document.addEventListener("touchstart", r, true),
                            document.addEventListener("touchend", r, true),
                            document.addEventListener("click", r, true),
                            document.addEventListener("keydown", r, true),
                            a
                        )
                    }
                }
                _obtainHtml5Audio() {
                    var a = this || t
                    if (a._html5AudioPool.length) return a._html5AudioPool.pop()
                    var r = new Audio().play()
                    return (
                        r &&
                        typeof Promise < "u" &&
                        (r instanceof Promise || typeof r.then == "function") &&
                        r.catch(function () {
                            console.warn("HTML5 Audio pool exhausted, returning potentially locked audio object.")
                        }),
                        new Audio()
                    )
                }
                _releaseHtml5Audio(a) {
                    var r = this || t
                    return a._unlocked && r._html5AudioPool.push(a), r
                }
                _autoSuspend() {
                    var a = this
                    if (!(!a.autoSuspend || !a.ctx || typeof a.ctx.suspend > "u" || !t.usingWebAudio)) {
                        for (var r = 0; r < a._howls.length; r++)
                            if (a._howls[r]._webAudio) {
                                for (var d = 0; d < a._howls[r]._sounds.length; d++)
                                    if (!a._howls[r]._sounds[d]._paused) return a
                            }
                        return (
                            a._suspendTimer && clearTimeout(a._suspendTimer),
                            (a._suspendTimer = setTimeout(function () {
                                if (a.autoSuspend) {
                                    ; (a._suspendTimer = null), (a.state = "suspending")
                                    var u = function () {
                                        ; (a.state = "suspended"),
                                            a._resumeAfterSuspend && (delete a._resumeAfterSuspend, a._autoResume())
                                    }
                                    a.ctx.suspend().then(u, u)
                                }
                            }, 3e4)),
                            a
                        )
                    }
                }
                _autoResume() {
                    var a = this
                    if (!(!a.ctx || typeof a.ctx.resume > "u" || !t.usingWebAudio))
                        return (
                            a.state === "running" && a.ctx.state !== "interrupted" && a._suspendTimer
                                ? (clearTimeout(a._suspendTimer), (a._suspendTimer = null))
                                : a.state === "suspended" || (a.state === "running" && a.ctx.state === "interrupted")
                                    ? (a.ctx.resume().then(function () {
                                        a.state = "running"
                                        for (var r = 0; r < a._howls.length; r++) a._howls[r]._emit("resume")
                                    }),
                                        a._suspendTimer && (clearTimeout(a._suspendTimer), (a._suspendTimer = null)))
                                    : a.state === "suspending" && (a._resumeAfterSuspend = true),
                            a
                        )
                }
            }
            var t = new o()
            class e {
                constructor(a) {
                    var r = this
                    if (!a.src || a.src.length === 0) {
                        console.error("An array of source files must be passed with any new Howl.")
                        return
                    }
                    r.init(a)
                }
                init(a) {
                    var r = this
                    return (
                        t.ctx || m(),
                        (r._autoplay = a.autoplay || false),
                        (r._format = typeof a.format != "string" ? a.format : [a.format]),
                        (r._html5 = a.html5 || false),
                        (r._muted = a.mute || false),
                        (r._loop = a.loop || false),
                        (r._pool = a.pool || 5),
                        (r._preload = typeof a.preload == "boolean" || a.preload === "metadata" ? a.preload : true),
                        (r._rate = a.rate || 1),
                        (r._sprite = a.sprite || {}),
                        (r._src = typeof a.src != "string" ? a.src : [a.src]),
                        (r._volume = a.volume !== void 0 ? a.volume : 1),
                        (r._xhr = {
                            method: a.xhr && a.xhr.method ? a.xhr.method : "GET",
                            headers: a.xhr && a.xhr.headers ? a.xhr.headers : null,
                            withCredentials: a.xhr && a.xhr.withCredentials ? a.xhr.withCredentials : false,
                        }),
                        (r._duration = 0),
                        (r._state = "unloaded"),
                        (r._sounds = []),
                        (r._endTimers = {}),
                        (r._queue = []),
                        (r._playLock = false),
                        (r._onend = a.onend ? [{ fn: a.onend }] : []),
                        (r._onfade = a.onfade ? [{ fn: a.onfade }] : []),
                        (r._onload = a.onload ? [{ fn: a.onload }] : []),
                        (r._onloaderror = a.onloaderror ? [{ fn: a.onloaderror }] : []),
                        (r._onplayerror = a.onplayerror ? [{ fn: a.onplayerror }] : []),
                        (r._onpause = a.onpause ? [{ fn: a.onpause }] : []),
                        (r._onplay = a.onplay ? [{ fn: a.onplay }] : []),
                        (r._onstop = a.onstop ? [{ fn: a.onstop }] : []),
                        (r._onmute = a.onmute ? [{ fn: a.onmute }] : []),
                        (r._onvolume = a.onvolume ? [{ fn: a.onvolume }] : []),
                        (r._onrate = a.onrate ? [{ fn: a.onrate }] : []),
                        (r._onseek = a.onseek ? [{ fn: a.onseek }] : []),
                        (r._onunlock = a.onunlock ? [{ fn: a.onunlock }] : []),
                        (r._onresume = []),
                        (r._webAudio = t.usingWebAudio && !r._html5),
                        typeof t.ctx < "u" && t.ctx && t.autoUnlock && t._unlockAudio(),
                        t._howls.push(r),
                        r._autoplay &&
                        r._queue.push({
                            event: "play",
                            action: function () {
                                r.play()
                            },
                        }),
                        r._preload && r._preload !== "none" && r.load(),
                        r
                    )
                }
                load() {
                    var a = this, r = null
                    if (t.noAudio) {
                        a._emit("loaderror", null, "No audio support.")
                        return
                    }
                    typeof a._src == "string" && (a._src = [a._src])
                    for (var d = 0; d < a._src.length; d++) {
                        var u, p
                        if (a._format && a._format[d]) u = a._format[d]
                        else {
                            if (((p = a._src[d]), typeof p != "string")) {
                                a._emit("loaderror", null, "Non-string found in selected audio sources - ignoring.")
                                continue
                            }
                            ; (u = /^data:audio\/([^;,]+);/i.exec(p)),
                                u || (u = /\.([^.]+)$/.exec(p.split("?", 1)[0])),
                                u && (u = u[1].toLowerCase())
                        }
                        if ((u ||
                            console.warn(
                                'No file extension was found. Consider using the "format" property or specify an extension.'
                            ),
                            u && t.codecs(u))) {
                            r = a._src[d]
                            break
                        }
                    }
                    if (!r) {
                        a._emit("loaderror", null, "No codec support for selected audio sources.")
                        return
                    }
                    return (
                        (a._src = r),
                        (a._state = "loading"),
                        window.location.protocol === "https:" &&
                        r.slice(0, 5) === "http:" &&
                        ((a._html5 = true), (a._webAudio = false)),
                        new n(a),
                        a._webAudio && s(a),
                        a
                    )
                }
                play(a, r) {
                    var d = this, u = null
                    if (typeof a == "number") (u = a), (a = null)
                    else {
                        if (typeof a == "string" && d._state === "loaded" && !d._sprite[a]) return null
                        if (typeof a > "u" && ((a = "__default"), !d._playLock)) {
                            for (var p = 0, f = 0; f < d._sounds.length; f++)
                                d._sounds[f]._paused && !d._sounds[f]._ended && (p++, (u = d._sounds[f]._id))
                            p === 1 ? (a = null) : (u = null)
                        }
                    }
                    var Q = u ? d._soundById(u) : d._inactiveSound()
                    if (!Q) return null
                    if ((u && !a && (a = Q._sprite || "__default"), d._state !== "loaded")) {
                        ; (Q._sprite = a), (Q._ended = false)
                        var b = Q._id
                        return (
                            d._queue.push({
                                event: "play",
                                action: function () {
                                    d.play(b)
                                },
                            }),
                            b
                        )
                    }
                    if (u && !Q._paused) return r || d._loadQueue("play"), Q._id
                    d._webAudio && t._autoResume()
                    var g = Math.max(0, Q._seek > 0 ? Q._seek : d._sprite[a][0] / 1e3), B = Math.max(0, (d._sprite[a][0] + d._sprite[a][1]) / 1e3 - g), x = (B * 1e3) / Math.abs(Q._rate), E = d._sprite[a][0] / 1e3, W = (d._sprite[a][0] + d._sprite[a][1]) / 1e3; (Q._sprite = a), (Q._ended = false)
                    var y = function () {
                        ; (Q._paused = false),
                            (Q._seek = g),
                            (Q._start = E),
                            (Q._stop = W),
                            (Q._loop = !!(Q._loop || d._sprite[a][2]))
                    }
                    if (g >= W) {
                        d._ended(Q)
                        return
                    }
                    var w = Q._node
                    if (d._webAudio) {
                        var k = function () {
                            ; (d._playLock = false), y(), d._refreshBuffer(Q)
                            var L = Q._muted || d._muted ? 0 : Q._volume
                            w.gain.setValueAtTime(L, t.ctx.currentTime),
                                (Q._playStart = t.ctx.currentTime),
                                typeof w.bufferSource.start > "u"
                                    ? Q._loop
                                        ? w.bufferSource.noteGrainOn(0, g, 86400)
                                        : w.bufferSource.noteGrainOn(0, g, B)
                                    : Q._loop
                                        ? w.bufferSource.start(0, g, 86400)
                                        : w.bufferSource.start(0, g, B),
                                x !== 1 / 0 && (d._endTimers[Q._id] = setTimeout(d._ended.bind(d, Q), x)),
                                r ||
                                setTimeout(function () {
                                    d._emit("play", Q._id), d._loadQueue()
                                }, 0)
                        }
                        t.state === "running" && t.ctx.state !== "interrupted"
                            ? k()
                            : ((d._playLock = true), d.once("resume", k), d._clearTimer(Q._id))
                    } else {
                        var U = function () {
                            ; (w.currentTime = g),
                                (w.muted = Q._muted || d._muted || t._muted || w.muted),
                                (w.volume = Q._volume * t.volume()),
                                (w.playbackRate = Q._rate)
                            try {
                                var L = w.play()
                                if ((L && typeof Promise < "u" && (L instanceof Promise || typeof L.then == "function")
                                    ? ((d._playLock = true),
                                        y(),
                                        L.then(function () {
                                            ; (d._playLock = false),
                                                (w._unlocked = true),
                                                r ? d._loadQueue() : d._emit("play", Q._id)
                                        }).catch(function () {
                                            ; (d._playLock = false),
                                                d._emit(
                                                    "playerror",
                                                    Q._id,
                                                    "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."
                                                ),
                                                (Q._ended = true),
                                                (Q._paused = true)
                                        }))
                                    : r || ((d._playLock = false), y(), d._emit("play", Q._id)),
                                    (w.playbackRate = Q._rate),
                                    w.paused)) {
                                    d._emit(
                                        "playerror",
                                        Q._id,
                                        "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."
                                    )
                                    return
                                }
                                a !== "__default" || Q._loop
                                    ? (d._endTimers[Q._id] = setTimeout(d._ended.bind(d, Q), x))
                                    : ((d._endTimers[Q._id] = function () {
                                        d._ended(Q), w.removeEventListener("ended", d._endTimers[Q._id], false)
                                    }),
                                        w.addEventListener("ended", d._endTimers[Q._id], false))
                            } catch (Y) {
                                d._emit("playerror", Q._id, Y)
                            }
                        }
                        w.src ===
                            "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA" &&
                            ((w.src = d._src), w.load())
                        var S = (window && window.ejecta) || (!w.readyState && t._navigator.isCocoonJS)
                        if (w.readyState >= 3 || S) U()
                        else {
                            ; (d._playLock = true), (d._state = "loading")
                            var T = function () {
                                ; (d._state = "loaded"), U(), w.removeEventListener(t._canPlayEvent, T, false)
                            }
                            w.addEventListener(t._canPlayEvent, T, false), d._clearTimer(Q._id)
                        }
                    }
                    return Q._id
                }
                pause(a) {
                    var r = this
                    if (r._state !== "loaded" || r._playLock)
                        return (
                            r._queue.push({
                                event: "pause",
                                action: function () {
                                    r.pause(a)
                                },
                            }),
                            r
                        )
                    for (var d = r._getSoundIds(a), u = 0; u < d.length; u++) {
                        r._clearTimer(d[u])
                        var p = r._soundById(d[u])
                        if (p &&
                            !p._paused &&
                            ((p._seek = r.seek(d[u])), (p._rateSeek = 0), (p._paused = true), r._stopFade(d[u]), p._node))
                            if (r._webAudio) {
                                if (!p._node.bufferSource) continue
                                typeof p._node.bufferSource.stop > "u"
                                    ? p._node.bufferSource.noteOff(0)
                                    : p._node.bufferSource.stop(0),
                                    r._cleanBuffer(p._node)
                            } else (!isNaN(p._node.duration) || p._node.duration === 1 / 0) && p._node.pause()
                        arguments[1] || r._emit("pause", p ? p._id : null)
                    }
                    return r
                }
                stop(a, r) {
                    var d = this
                    if (d._state !== "loaded" || d._playLock)
                        return (
                            d._queue.push({
                                event: "stop",
                                action: function () {
                                    d.stop(a)
                                },
                            }),
                            d
                        )
                    for (var u = d._getSoundIds(a), p = 0; p < u.length; p++) {
                        d._clearTimer(u[p])
                        var f = d._soundById(u[p])
                        f &&
                            ((f._seek = f._start || 0),
                                (f._rateSeek = 0),
                                (f._paused = true),
                                (f._ended = true),
                                d._stopFade(u[p]),
                                f._node &&
                                (d._webAudio
                                    ? f._node.bufferSource &&
                                    (typeof f._node.bufferSource.stop > "u"
                                        ? f._node.bufferSource.noteOff(0)
                                        : f._node.bufferSource.stop(0),
                                        d._cleanBuffer(f._node))
                                    : (!isNaN(f._node.duration) || f._node.duration === 1 / 0) &&
                                    ((f._node.currentTime = f._start || 0),
                                        f._node.pause(),
                                        f._node.duration === 1 / 0 && d._clearSound(f._node))),
                                r || d._emit("stop", f._id))
                    }
                    return d
                }
                mute(a, r) {
                    var d = this
                    if (d._state !== "loaded" || d._playLock)
                        return (
                            d._queue.push({
                                event: "mute",
                                action: function () {
                                    d.mute(a, r)
                                },
                            }),
                            d
                        )
                    if (typeof r > "u")
                        if (typeof a == "boolean") d._muted = a
                        else return d._muted
                    for (var u = d._getSoundIds(r), p = 0; p < u.length; p++) {
                        var f = d._soundById(u[p])
                        f &&
                            ((f._muted = a),
                                f._interval && d._stopFade(f._id),
                                d._webAudio && f._node
                                    ? f._node.gain.setValueAtTime(a ? 0 : f._volume, t.ctx.currentTime)
                                    : f._node && (f._node.muted = t._muted ? true : a),
                                d._emit("mute", f._id))
                    }
                    return d
                }
                volume() {
                    var a = this, r = arguments, d, u
                    if (r.length === 0) return a._volume
                    if (r.length === 1 || (r.length === 2 && typeof r[1] > "u")) {
                        var p = a._getSoundIds(), f = p.indexOf(r[0])
                        f >= 0 ? (u = parseInt(r[0], 10)) : (d = parseFloat(r[0]))
                    } else r.length >= 2 && ((d = parseFloat(r[0])), (u = parseInt(r[1], 10)))
                    var Q
                    if (typeof d < "u" && d >= 0 && d <= 1) {
                        if (a._state !== "loaded" || a._playLock)
                            return (
                                a._queue.push({
                                    event: "volume",
                                    action: function () {
                                        a.volume.apply(a, r)
                                    },
                                }),
                                a
                            )
                        typeof u > "u" && (a._volume = d), (u = a._getSoundIds(u))
                        for (var b = 0; b < u.length; b++)
                            (Q = a._soundById(u[b])),
                                Q &&
                                ((Q._volume = d),
                                    r[2] || a._stopFade(u[b]),
                                    a._webAudio && Q._node && !Q._muted
                                        ? Q._node.gain.setValueAtTime(d, t.ctx.currentTime)
                                        : Q._node && !Q._muted && (Q._node.volume = d * t.volume()),
                                    a._emit("volume", Q._id))
                    } else return (Q = u ? a._soundById(u) : a._sounds[0]), Q ? Q._volume : 0
                    return a
                }
                fade(a, r, d, u) {
                    var p = this
                    if (p._state !== "loaded" || p._playLock)
                        return (
                            p._queue.push({
                                event: "fade",
                                action: function () {
                                    p.fade(a, r, d, u)
                                },
                            }),
                            p
                        ); (a = Math.min(Math.max(0, parseFloat(a)), 1)),
                            (r = Math.min(Math.max(0, parseFloat(r)), 1)),
                            (d = parseFloat(d)),
                            p.volume(a, u)
                    for (var f = p._getSoundIds(u), Q = 0; Q < f.length; Q++) {
                        var b = p._soundById(f[Q])
                        if (b) {
                            if ((u || p._stopFade(f[Q]), p._webAudio && !b._muted)) {
                                var g = t.ctx.currentTime, B = g + d / 1e3; (b._volume = a),
                                    b._node.gain.setValueAtTime(a, g),
                                    b._node.gain.linearRampToValueAtTime(r, B)
                            }
                            p._startFadeInterval(b, a, r, d, f[Q], typeof u > "u")
                        }
                    }
                    return p
                }
                _startFadeInterval(a, r, d, u, p, f) {
                    var Q = this, b = r, g = d - r, B = Math.abs(g / 0.01), x = Math.max(4, B > 0 ? u / B : u), E = Date.now(); (a._fadeTo = d),
                        (a._interval = setInterval(function () {
                            var W = (Date.now() - E) / u; (E = Date.now()),
                                (b += g * W),
                                (b = Math.round(b * 100) / 100),
                                g < 0 ? (b = Math.max(d, b)) : (b = Math.min(d, b)),
                                Q._webAudio ? (a._volume = b) : Q.volume(b, a._id, true),
                                f && (Q._volume = b),
                                ((d < r && b <= d) || (d > r && b >= d)) &&
                                (clearInterval(a._interval),
                                    (a._interval = null),
                                    (a._fadeTo = null),
                                    Q.volume(d, a._id),
                                    Q._emit("fade", a._id))
                        }, x))
                }
                _stopFade(a) {
                    var r = this, d = r._soundById(a)
                    return (
                        d &&
                        d._interval &&
                        (r._webAudio && d._node.gain.cancelScheduledValues(t.ctx.currentTime),
                            clearInterval(d._interval),
                            (d._interval = null),
                            r.volume(d._fadeTo, a),
                            (d._fadeTo = null),
                            r._emit("fade", a)),
                        r
                    )
                }
                loop() {
                    var a = this, r = arguments, d, u, p
                    if (r.length === 0) return a._loop
                    if (r.length === 1)
                        if (typeof r[0] == "boolean") (d = r[0]), (a._loop = d)
                        else return (p = a._soundById(parseInt(r[0], 10))), p ? p._loop : false
                    else r.length === 2 && ((d = r[0]), (u = parseInt(r[1], 10)))
                    for (var f = a._getSoundIds(u), Q = 0; Q < f.length; Q++)
                        (p = a._soundById(f[Q])),
                            p &&
                            ((p._loop = d),
                                a._webAudio &&
                                p._node &&
                                p._node.bufferSource &&
                                ((p._node.bufferSource.loop = d),
                                    d &&
                                    ((p._node.bufferSource.loopStart = p._start || 0),
                                        (p._node.bufferSource.loopEnd = p._stop),
                                        a.playing(f[Q]) && (a.pause(f[Q], true), a.play(f[Q], true)))))
                    return a
                }
                rate() {
                    var a = this, r = arguments, d, u
                    if (r.length === 0) u = a._sounds[0]._id
                    else if (r.length === 1) {
                        var p = a._getSoundIds(), f = p.indexOf(r[0])
                        f >= 0 ? (u = parseInt(r[0], 10)) : (d = parseFloat(r[0]))
                    } else r.length === 2 && ((d = parseFloat(r[0])), (u = parseInt(r[1], 10)))
                    var Q
                    if (typeof d == "number") {
                        if (a._state !== "loaded" || a._playLock)
                            return (
                                a._queue.push({
                                    event: "rate",
                                    action: function () {
                                        a.rate.apply(a, r)
                                    },
                                }),
                                a
                            )
                        typeof u > "u" && (a._rate = d), (u = a._getSoundIds(u))
                        for (var b = 0; b < u.length; b++)
                            if (((Q = a._soundById(u[b])), Q)) {
                                a.playing(u[b]) &&
                                    ((Q._rateSeek = a.seek(u[b])),
                                        (Q._playStart = a._webAudio ? t.ctx.currentTime : Q._playStart)),
                                    (Q._rate = d),
                                    a._webAudio && Q._node && Q._node.bufferSource
                                        ? Q._node.bufferSource.playbackRate.setValueAtTime(d, t.ctx.currentTime)
                                        : Q._node && (Q._node.playbackRate = d)
                                var g = a.seek(u[b]), B = (a._sprite[Q._sprite][0] + a._sprite[Q._sprite][1]) / 1e3 - g, x = (B * 1e3) / Math.abs(Q._rate); (a._endTimers[u[b]] || !Q._paused) &&
                                    (a._clearTimer(u[b]), (a._endTimers[u[b]] = setTimeout(a._ended.bind(a, Q), x))),
                                    a._emit("rate", Q._id)
                            }
                    } else return (Q = a._soundById(u)), Q ? Q._rate : a._rate
                    return a
                }
                seek() {
                    var a = this, r = arguments, d, u
                    if (r.length === 0) a._sounds.length && (u = a._sounds[0]._id)
                    else if (r.length === 1) {
                        var p = a._getSoundIds(), f = p.indexOf(r[0])
                        f >= 0
                            ? (u = parseInt(r[0], 10))
                            : a._sounds.length && ((u = a._sounds[0]._id), (d = parseFloat(r[0])))
                    } else r.length === 2 && ((d = parseFloat(r[0])), (u = parseInt(r[1], 10)))
                    if (typeof u > "u") return 0
                    if (typeof d == "number" && (a._state !== "loaded" || a._playLock))
                        return (
                            a._queue.push({
                                event: "seek",
                                action: function () {
                                    a.seek.apply(a, r)
                                },
                            }),
                            a
                        )
                    var Q = a._soundById(u)
                    if (Q)
                        if (typeof d == "number" && d >= 0) {
                            var b = a.playing(u)
                            b && a.pause(u, true),
                                (Q._seek = d),
                                (Q._ended = false),
                                a._clearTimer(u),
                                !a._webAudio && Q._node && !isNaN(Q._node.duration) && (Q._node.currentTime = d)
                            var g = function () {
                                b && a.play(u, true), a._emit("seek", u)
                            }
                            if (b && !a._webAudio) {
                                var B = function () {
                                    a._playLock ? setTimeout(B, 0) : g()
                                }
                                setTimeout(B, 0)
                            } else g()
                        } else if (a._webAudio) {
                            var x = a.playing(u) ? t.ctx.currentTime - Q._playStart : 0, E = Q._rateSeek ? Q._rateSeek - Q._seek : 0
                            return Q._seek + (E + x * Math.abs(Q._rate))
                        } else return Q._node.currentTime
                    return a
                }
                playing(a) {
                    var r = this
                    if (typeof a == "number") {
                        var d = r._soundById(a)
                        return d ? !d._paused : false
                    }
                    for (var u = 0; u < r._sounds.length; u++) if (!r._sounds[u]._paused) return true
                    return false
                }
                duration(a) {
                    var r = this, d = r._duration, u = r._soundById(a)
                    return u && (d = r._sprite[u._sprite][1] / 1e3), d
                }
                state() {
                    return this._state
                }
                unload() {
                    for (var a = this, r = a._sounds, d = 0; d < r.length; d++)
                        r[d]._paused || a.stop(r[d]._id),
                            a._webAudio ||
                            (a._clearSound(r[d]._node),
                                r[d]._node.removeEventListener("error", r[d]._errorFn, false),
                                r[d]._node.removeEventListener(t._canPlayEvent, r[d]._loadFn, false),
                                r[d]._node.removeEventListener("ended", r[d]._endFn, false),
                                t._releaseHtml5Audio(r[d]._node)),
                            delete r[d]._node,
                            a._clearTimer(r[d]._id)
                    var u = t._howls.indexOf(a)
                    u >= 0 && t._howls.splice(u, 1)
                    var p = true
                    for (d = 0; d < t._howls.length; d++)
                        if (t._howls[d]._src === a._src || a._src.indexOf(t._howls[d]._src) >= 0) {
                            p = false
                            break
                        }
                    return (
                        i && p && delete i[a._src],
                        (t.noAudio = false),
                        (a._state = "unloaded"),
                        (a._sounds = []),
                        (a = null),
                        null
                    )
                }
                on(a, r, d, u) {
                    var p = this, f = p["_on" + a]
                    return typeof r == "function" && f.push(u ? { id: d, fn: r, once: u } : { id: d, fn: r }), p
                }
                off(a, r, d) {
                    var u = this, p = u["_on" + a], f = 0
                    if ((typeof r == "number" && ((d = r), (r = null)), r || d))
                        for (f = 0; f < p.length; f++) {
                            var Q = d === p[f].id
                            if ((r === p[f].fn && Q) || (!r && Q)) {
                                p.splice(f, 1)
                                break
                            }
                        }
                    else if (a) u["_on" + a] = []
                    else {
                        var b = Object.keys(u)
                        for (f = 0; f < b.length; f++)
                            b[f].indexOf("_on") === 0 && Array.isArray(u[b[f]]) && (u[b[f]] = [])
                    }
                    return u
                }
                once(a, r, d) {
                    var u = this
                    return u.on(a, r, d, 1), u
                }
                _emit(a, r, d) {
                    for (var u = this, p = u["_on" + a], f = p.length - 1; f >= 0; f--)
                        (!p[f].id || p[f].id === r || a === "load") &&
                            (setTimeout(
                                function (Q) {
                                    Q.call(this, r, d)
                                }.bind(u, p[f].fn),
                                0
                            ),
                                p[f].once && u.off(a, p[f].fn, p[f].id))
                    return u._loadQueue(a), u
                }
                _loadQueue(a) {
                    var r = this
                    if (r._queue.length > 0) {
                        var d = r._queue[0]
                        d.event === a && (r._queue.shift(), r._loadQueue()), a || d.action()
                    }
                    return r
                }
                _ended(a) {
                    var r = this, d = a._sprite
                    if (!r._webAudio && a._node && !a._node.paused && !a._node.ended && a._node.currentTime < a._stop)
                        return setTimeout(r._ended.bind(r, a), 100), r
                    var u = !!(a._loop || r._sprite[d][2])
                    if ((r._emit("end", a._id), !r._webAudio && u && r.stop(a._id, true).play(a._id), r._webAudio && u)) {
                        r._emit("play", a._id),
                            (a._seek = a._start || 0),
                            (a._rateSeek = 0),
                            (a._playStart = t.ctx.currentTime)
                        var p = ((a._stop - a._start) * 1e3) / Math.abs(a._rate)
                        r._endTimers[a._id] = setTimeout(r._ended.bind(r, a), p)
                    }
                    return (
                        r._webAudio &&
                        !u &&
                        ((a._paused = true),
                            (a._ended = true),
                            (a._seek = a._start || 0),
                            (a._rateSeek = 0),
                            r._clearTimer(a._id),
                            r._cleanBuffer(a._node),
                            t._autoSuspend()),
                        !r._webAudio && !u && r.stop(a._id, true),
                        r
                    )
                }
                _clearTimer(a) {
                    var r = this
                    if (r._endTimers[a]) {
                        if (typeof r._endTimers[a] != "function") clearTimeout(r._endTimers[a])
                        else {
                            var d = r._soundById(a)
                            d && d._node && d._node.removeEventListener("ended", r._endTimers[a], false)
                        }
                        delete r._endTimers[a]
                    }
                    return r
                }
                _soundById(a) {
                    for (var r = this, d = 0; d < r._sounds.length; d++) if (a === r._sounds[d]._id) return r._sounds[d]
                    return null
                }
                _inactiveSound() {
                    var a = this
                    a._drain()
                    for (var r = 0; r < a._sounds.length; r++) if (a._sounds[r]._ended) return a._sounds[r].reset()
                    return new n(a)
                }
                _drain() {
                    var a = this, r = a._pool, d = 0, u = 0
                    if (!(a._sounds.length < r)) {
                        for (u = 0; u < a._sounds.length; u++) a._sounds[u]._ended && d++
                        for (u = a._sounds.length - 1; u >= 0; u--) {
                            if (d <= r) return
                            a._sounds[u]._ended &&
                                (a._webAudio && a._sounds[u]._node && a._sounds[u]._node.disconnect(0),
                                    a._sounds.splice(u, 1),
                                    d--)
                        }
                    }
                }
                _getSoundIds(a) {
                    var r = this
                    if (typeof a > "u") {
                        for (var d = [], u = 0; u < r._sounds.length; u++) d.push(r._sounds[u]._id)
                        return d
                    } else return [a]
                }
                _refreshBuffer(a) {
                    var r = this
                    return (
                        (a._node.bufferSource = t.ctx.createBufferSource()),
                        (a._node.bufferSource.buffer = i[r._src]),
                        a._panner ? a._node.bufferSource.connect(a._panner) : a._node.bufferSource.connect(a._node),
                        (a._node.bufferSource.loop = a._loop),
                        a._loop &&
                        ((a._node.bufferSource.loopStart = a._start || 0),
                            (a._node.bufferSource.loopEnd = a._stop || 0)),
                        a._node.bufferSource.playbackRate.setValueAtTime(a._rate, t.ctx.currentTime),
                        r
                    )
                }
                _cleanBuffer(a) {
                    var r = this, d = t._navigator && t._navigator.vendor.indexOf("Apple") >= 0
                    if (!a.bufferSource) return r
                    if (t._scratchBuffer &&
                        a.bufferSource &&
                        ((a.bufferSource.onended = null), a.bufferSource.disconnect(0), d))
                        try {
                            a.bufferSource.buffer = t._scratchBuffer
                        } catch { }
                    return (a.bufferSource = null), r
                }
                _clearSound(a) {
                    var r = /MSIE |Trident\//.test(t._navigator && t._navigator.userAgent)
                    r ||
                        (a.src =
                            "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA")
                }
            }
            class n {
                constructor(a) {
                    ; (this._parent = a), this.init()
                }
                init() {
                    var a = this, r = a._parent
                    return (
                        (a._muted = r._muted),
                        (a._loop = r._loop),
                        (a._volume = r._volume),
                        (a._rate = r._rate),
                        (a._seek = 0),
                        (a._paused = true),
                        (a._ended = true),
                        (a._sprite = "__default"),
                        (a._id = ++t._counter),
                        r._sounds.push(a),
                        a.create(),
                        a
                    )
                }
                create() {
                    var a = this, r = a._parent, d = t._muted || a._muted || a._parent._muted ? 0 : a._volume
                    return (
                        r._webAudio
                            ? ((a._node = typeof t.ctx.createGain > "u" ? t.ctx.createGainNode() : t.ctx.createGain()),
                                a._node.gain.setValueAtTime(d, t.ctx.currentTime),
                                (a._node.paused = true),
                                a._node.connect(t.masterGain))
                            : t.noAudio ||
                            ((a._node = t._obtainHtml5Audio()),
                                (a._errorFn = a._errorListener.bind(a)),
                                a._node.addEventListener("error", a._errorFn, false),
                                (a._loadFn = a._loadListener.bind(a)),
                                a._node.addEventListener(t._canPlayEvent, a._loadFn, false),
                                (a._endFn = a._endListener.bind(a)),
                                a._node.addEventListener("ended", a._endFn, false),
                                (a._node.src = r._src),
                                (a._node.preload = r._preload === true ? "auto" : r._preload),
                                (a._node.volume = d * t.volume()),
                                a._node.load()),
                        a
                    )
                }
                reset() {
                    var a = this, r = a._parent
                    return (
                        (a._muted = r._muted),
                        (a._loop = r._loop),
                        (a._volume = r._volume),
                        (a._rate = r._rate),
                        (a._seek = 0),
                        (a._rateSeek = 0),
                        (a._paused = true),
                        (a._ended = true),
                        (a._sprite = "__default"),
                        (a._id = ++t._counter),
                        a
                    )
                }
                _errorListener() {
                    var a = this
                    a._parent._emit("loaderror", a._id, a._node.error ? a._node.error.code : 0),
                        a._node.removeEventListener("error", a._errorFn, false)
                }
                _loadListener() {
                    var a = this, r = a._parent; (r._duration = Math.ceil(a._node.duration * 10) / 10),
                        Object.keys(r._sprite).length === 0 && (r._sprite = { __default: [0, r._duration * 1e3] }),
                        r._state !== "loaded" && ((r._state = "loaded"), r._emit("load"), r._loadQueue()),
                        a._node.removeEventListener(t._canPlayEvent, a._loadFn, false)
                }
                _endListener() {
                    var a = this, r = a._parent
                    r._duration === 1 / 0 &&
                        ((r._duration = Math.ceil(a._node.duration * 10) / 10),
                            r._sprite.__default[1] === 1 / 0 && (r._sprite.__default[1] = r._duration * 1e3),
                            r._ended(a)),
                        a._node.removeEventListener("ended", a._endFn, false)
                }
            }
            var i = {},
                s = function (a) {
                    var r = a._src
                    if (i[r]) {
                        ; (a._duration = i[r].duration), h(a)
                        return
                    }
                    if (/^data:[^;]+;base64,/.test(r)) {
                        for (var d = atob(r.split(",")[1]), u = new Uint8Array(d.length), p = 0; p < d.length; ++p)
                            u[p] = d.charCodeAt(p)
                        c(u.buffer, a)
                    } else {
                        var f = new XMLHttpRequest()
                        f.open(a._xhr.method, r, true),
                            (f.withCredentials = a._xhr.withCredentials),
                            (f.responseType = "arraybuffer"),
                            a._xhr.headers &&
                            Object.keys(a._xhr.headers).forEach(function (Q) {
                                f.setRequestHeader(Q, a._xhr.headers[Q])
                            }),
                            (f.onload = function () {
                                var Q = (f.status + "")[0]
                                if (Q !== "0" && Q !== "2" && Q !== "3") {
                                    a._emit(
                                        "loaderror",
                                        null,
                                        "Failed loading audio file with status: " + f.status + "."
                                    )
                                    return
                                }
                                c(f.response, a)
                            }),
                            (f.onerror = function () {
                                a._webAudio &&
                                    ((a._html5 = true), (a._webAudio = false), (a._sounds = []), delete i[r], a.load())
                            }),
                            l(f)
                    }
                },
                l = function (a) {
                    try {
                        a.send()
                    } catch {
                        a.onerror()
                    }
                },
                c = function (a, r) {
                    var d = function () {
                        r._emit("loaderror", null, "Decoding audio data failed.")
                    },
                        u = function (p) {
                            p && r._sounds.length > 0 ? ((i[r._src] = p), h(r, p)) : d()
                        }
                    typeof Promise < "u" && t.ctx.decodeAudioData.length === 1
                        ? t.ctx.decodeAudioData(a).then(u).catch(d)
                        : t.ctx.decodeAudioData(a, u, d)
                },
                h = function (a, r) {
                    r && !a._duration && (a._duration = r.duration),
                        Object.keys(a._sprite).length === 0 && (a._sprite = { __default: [0, a._duration * 1e3] }),
                        a._state !== "loaded" && ((a._state = "loaded"), a._emit("load"), a._loadQueue())
                },
                m = function () {
                    if (t.usingWebAudio) {
                        try {
                            typeof AudioContext < "u"
                                ? (t.ctx = new AudioContext())
                                : typeof webkitAudioContext < "u"
                                    ? (t.ctx = new webkitAudioContext())
                                    : (t.usingWebAudio = false)
                        } catch {
                            t.usingWebAudio = false
                        }
                        t.ctx || (t.usingWebAudio = false)
                        var a = /iP(hone|od|ad)/.test(t._navigator && t._navigator.platform),
                            r = t._navigator && t._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),
                            d = r ? parseInt(r[1], 10) : null
                        if (a && d && d < 9) {
                            var u = /safari/.test(t._navigator && t._navigator.userAgent.toLowerCase())
                            t._navigator && !u && (t.usingWebAudio = false)
                        }
                        t.usingWebAudio &&
                            ((t.masterGain =
                                typeof t.ctx.createGain > "u" ? t.ctx.createGainNode() : t.ctx.createGain()),
                                t.masterGain.gain.setValueAtTime(t._muted ? 0 : t._volume, t.ctx.currentTime),
                                t.masterGain.connect(t.ctx.destination)),
                            t._setup()
                    }
                }
            typeof define == "function" &&
                define.amd &&
                define([], function () {
                    return { Howler: t, Howl: e }
                }),
                typeof Re < "u" && ((Re.Howler = t), (Re.Howl = e)),
                typeof global < "u"
                    ? ((global.HowlerGlobal = o), (global.Howler = t), (global.Howl = e), (global.Sound = n))
                    : typeof window < "u" &&
                    ((window.HowlerGlobal = o), (window.Howler = t), (window.Howl = e), (window.Sound = n))
        })()
            ; (function () {
                "use strict"
                    ; (HowlerGlobal.prototype._pos = [0, 0, 0]),
                        (HowlerGlobal.prototype._orientation = [0, 0, -1, 0, 1, 0]),
                        (HowlerGlobal.prototype.stereo = function (t) {
                            var e = this
                            if (!e.ctx || !e.ctx.listener) return e
                            for (var n = e._howls.length - 1; n >= 0; n--) e._howls[n].stereo(t)
                            return e
                        }),
                        (HowlerGlobal.prototype.pos = function (t, e, n) {
                            var i = this
                            if (!i.ctx || !i.ctx.listener) return i
                            if (
                                ((e = typeof e != "number" ? i._pos[1] : e),
                                    (n = typeof n != "number" ? i._pos[2] : n),
                                    typeof t == "number")
                            )
                                (i._pos = [t, e, n]),
                                    typeof i.ctx.listener.positionX < "u"
                                        ? (i.ctx.listener.positionX.setTargetAtTime(i._pos[0], Howler.ctx.currentTime, 0.1),
                                            i.ctx.listener.positionY.setTargetAtTime(i._pos[1], Howler.ctx.currentTime, 0.1),
                                            i.ctx.listener.positionZ.setTargetAtTime(i._pos[2], Howler.ctx.currentTime, 0.1))
                                        : i.ctx.listener.setPosition(i._pos[0], i._pos[1], i._pos[2])
                            else return i._pos
                            return i
                        }),
                        (HowlerGlobal.prototype.orientation = function (t, e, n, i, s, l) {
                            var c = this
                            if (!c.ctx || !c.ctx.listener) return c
                            var h = c._orientation
                            if (
                                ((e = typeof e != "number" ? h[1] : e),
                                    (n = typeof n != "number" ? h[2] : n),
                                    (i = typeof i != "number" ? h[3] : i),
                                    (s = typeof s != "number" ? h[4] : s),
                                    (l = typeof l != "number" ? h[5] : l),
                                    typeof t == "number")
                            )
                                (c._orientation = [t, e, n, i, s, l]),
                                    typeof c.ctx.listener.forwardX < "u"
                                        ? (c.ctx.listener.forwardX.setTargetAtTime(t, Howler.ctx.currentTime, 0.1),
                                            c.ctx.listener.forwardY.setTargetAtTime(e, Howler.ctx.currentTime, 0.1),
                                            c.ctx.listener.forwardZ.setTargetAtTime(n, Howler.ctx.currentTime, 0.1),
                                            c.ctx.listener.upX.setTargetAtTime(i, Howler.ctx.currentTime, 0.1),
                                            c.ctx.listener.upY.setTargetAtTime(s, Howler.ctx.currentTime, 0.1),
                                            c.ctx.listener.upZ.setTargetAtTime(l, Howler.ctx.currentTime, 0.1))
                                        : c.ctx.listener.setOrientation(t, e, n, i, s, l)
                            else return h
                            return c
                        }),
                        (Howl.prototype.init = (function (t) {
                            return function (e) {
                                var n = this
                                return (
                                    (n._orientation = e.orientation || [1, 0, 0]),
                                    (n._stereo = e.stereo || null),
                                    (n._pos = e.pos || null),
                                    (n._pannerAttr = {
                                        coneInnerAngle: typeof e.coneInnerAngle < "u" ? e.coneInnerAngle : 360,
                                        coneOuterAngle: typeof e.coneOuterAngle < "u" ? e.coneOuterAngle : 360,
                                        coneOuterGain: typeof e.coneOuterGain < "u" ? e.coneOuterGain : 0,
                                        distanceModel: typeof e.distanceModel < "u" ? e.distanceModel : "inverse",
                                        maxDistance: typeof e.maxDistance < "u" ? e.maxDistance : 1e4,
                                        panningModel: typeof e.panningModel < "u" ? e.panningModel : "HRTF",
                                        refDistance: typeof e.refDistance < "u" ? e.refDistance : 1,
                                        rolloffFactor: typeof e.rolloffFactor < "u" ? e.rolloffFactor : 1,
                                    }),
                                    (n._onstereo = e.onstereo ? [{ fn: e.onstereo }] : []),
                                    (n._onpos = e.onpos ? [{ fn: e.onpos }] : []),
                                    (n._onorientation = e.onorientation ? [{ fn: e.onorientation }] : []),
                                    t.call(this, e)
                                )
                            }
                        })(Howl.prototype.init)),
                        (Howl.prototype.stereo = function (t, e) {
                            var n = this
                            if (!n._webAudio) return n
                            if (n._state !== "loaded")
                                return (
                                    n._queue.push({
                                        event: "stereo",
                                        action: function () {
                                            n.stereo(t, e)
                                        },
                                    }),
                                    n
                                )
                            var i = typeof Howler.ctx.createStereoPanner > "u" ? "spatial" : "stereo"
                            if (typeof e > "u")
                                if (typeof t == "number") (n._stereo = t), (n._pos = [t, 0, 0])
                                else return n._stereo
                            for (var s = n._getSoundIds(e), l = 0; l < s.length; l++) {
                                var c = n._soundById(s[l])
                                if (c)
                                    if (typeof t == "number")
                                        (c._stereo = t),
                                            (c._pos = [t, 0, 0]),
                                            c._node &&
                                            ((c._pannerAttr.panningModel = "equalpower"),
                                                (!c._panner || !c._panner.pan) && o(c, i),
                                                i === "spatial"
                                                    ? typeof c._panner.positionX < "u"
                                                        ? (c._panner.positionX.setValueAtTime(t, Howler.ctx.currentTime),
                                                            c._panner.positionY.setValueAtTime(0, Howler.ctx.currentTime),
                                                            c._panner.positionZ.setValueAtTime(0, Howler.ctx.currentTime))
                                                        : c._panner.setPosition(t, 0, 0)
                                                    : c._panner.pan.setValueAtTime(t, Howler.ctx.currentTime)),
                                            n._emit("stereo", c._id)
                                    else return c._stereo
                            }
                            return n
                        }),
                        (Howl.prototype.pos = function (t, e, n, i) {
                            var s = this
                            if (!s._webAudio) return s
                            if (s._state !== "loaded")
                                return (
                                    s._queue.push({
                                        event: "pos",
                                        action: function () {
                                            s.pos(t, e, n, i)
                                        },
                                    }),
                                    s
                                )
                            if (((e = typeof e != "number" ? 0 : e), (n = typeof n != "number" ? -0.5 : n), typeof i > "u"))
                                if (typeof t == "number") s._pos = [t, e, n]
                                else return s._pos
                            for (var l = s._getSoundIds(i), c = 0; c < l.length; c++) {
                                var h = s._soundById(l[c])
                                if (h)
                                    if (typeof t == "number")
                                        (h._pos = [t, e, n]),
                                            h._node &&
                                            ((!h._panner || h._panner.pan) && o(h, "spatial"),
                                                typeof h._panner.positionX < "u"
                                                    ? (h._panner.positionX.setValueAtTime(t, Howler.ctx.currentTime),
                                                        h._panner.positionY.setValueAtTime(e, Howler.ctx.currentTime),
                                                        h._panner.positionZ.setValueAtTime(n, Howler.ctx.currentTime))
                                                    : h._panner.setPosition(t, e, n)),
                                            s._emit("pos", h._id)
                                    else return h._pos
                            }
                            return s
                        }),
                        (Howl.prototype.orientation = function (t, e, n, i) {
                            var s = this
                            if (!s._webAudio) return s
                            if (s._state !== "loaded")
                                return (
                                    s._queue.push({
                                        event: "orientation",
                                        action: function () {
                                            s.orientation(t, e, n, i)
                                        },
                                    }),
                                    s
                                )
                            if (
                                ((e = typeof e != "number" ? s._orientation[1] : e),
                                    (n = typeof n != "number" ? s._orientation[2] : n),
                                    typeof i > "u")
                            )
                                if (typeof t == "number") s._orientation = [t, e, n]
                                else return s._orientation
                            for (var l = s._getSoundIds(i), c = 0; c < l.length; c++) {
                                var h = s._soundById(l[c])
                                if (h)
                                    if (typeof t == "number")
                                        (h._orientation = [t, e, n]),
                                            h._node &&
                                            (h._panner || (h._pos || (h._pos = s._pos || [0, 0, -0.5]), o(h, "spatial")),
                                                typeof h._panner.orientationX < "u"
                                                    ? (h._panner.orientationX.setValueAtTime(t, Howler.ctx.currentTime),
                                                        h._panner.orientationY.setValueAtTime(e, Howler.ctx.currentTime),
                                                        h._panner.orientationZ.setValueAtTime(n, Howler.ctx.currentTime))
                                                    : h._panner.setOrientation(t, e, n)),
                                            s._emit("orientation", h._id)
                                    else return h._orientation
                            }
                            return s
                        }),
                        (Howl.prototype.pannerAttr = function () {
                            var t = this,
                                e = arguments,
                                n,
                                i,
                                s
                            if (!t._webAudio) return t
                            if (e.length === 0) return t._pannerAttr
                            if (e.length === 1)
                                if (typeof e[0] == "object")
                                    (n = e[0]),
                                        typeof i > "u" &&
                                        (n.pannerAttr ||
                                            (n.pannerAttr = {
                                                coneInnerAngle: n.coneInnerAngle,
                                                coneOuterAngle: n.coneOuterAngle,
                                                coneOuterGain: n.coneOuterGain,
                                                distanceModel: n.distanceModel,
                                                maxDistance: n.maxDistance,
                                                refDistance: n.refDistance,
                                                rolloffFactor: n.rolloffFactor,
                                                panningModel: n.panningModel,
                                            }),
                                            (t._pannerAttr = {
                                                coneInnerAngle:
                                                    typeof n.pannerAttr.coneInnerAngle < "u"
                                                        ? n.pannerAttr.coneInnerAngle
                                                        : t._coneInnerAngle,
                                                coneOuterAngle:
                                                    typeof n.pannerAttr.coneOuterAngle < "u"
                                                        ? n.pannerAttr.coneOuterAngle
                                                        : t._coneOuterAngle,
                                                coneOuterGain:
                                                    typeof n.pannerAttr.coneOuterGain < "u"
                                                        ? n.pannerAttr.coneOuterGain
                                                        : t._coneOuterGain,
                                                distanceModel:
                                                    typeof n.pannerAttr.distanceModel < "u"
                                                        ? n.pannerAttr.distanceModel
                                                        : t._distanceModel,
                                                maxDistance:
                                                    typeof n.pannerAttr.maxDistance < "u"
                                                        ? n.pannerAttr.maxDistance
                                                        : t._maxDistance,
                                                refDistance:
                                                    typeof n.pannerAttr.refDistance < "u"
                                                        ? n.pannerAttr.refDistance
                                                        : t._refDistance,
                                                rolloffFactor:
                                                    typeof n.pannerAttr.rolloffFactor < "u"
                                                        ? n.pannerAttr.rolloffFactor
                                                        : t._rolloffFactor,
                                                panningModel:
                                                    typeof n.pannerAttr.panningModel < "u"
                                                        ? n.pannerAttr.panningModel
                                                        : t._panningModel,
                                            }))
                                else return (s = t._soundById(parseInt(e[0], 10))), s ? s._pannerAttr : t._pannerAttr
                            else e.length === 2 && ((n = e[0]), (i = parseInt(e[1], 10)))
                            for (var l = t._getSoundIds(i), c = 0; c < l.length; c++)
                                if (((s = t._soundById(l[c])), s)) {
                                    var h = s._pannerAttr
                                    h = {
                                        coneInnerAngle: typeof n.coneInnerAngle < "u" ? n.coneInnerAngle : h.coneInnerAngle,
                                        coneOuterAngle: typeof n.coneOuterAngle < "u" ? n.coneOuterAngle : h.coneOuterAngle,
                                        coneOuterGain: typeof n.coneOuterGain < "u" ? n.coneOuterGain : h.coneOuterGain,
                                        distanceModel: typeof n.distanceModel < "u" ? n.distanceModel : h.distanceModel,
                                        maxDistance: typeof n.maxDistance < "u" ? n.maxDistance : h.maxDistance,
                                        refDistance: typeof n.refDistance < "u" ? n.refDistance : h.refDistance,
                                        rolloffFactor: typeof n.rolloffFactor < "u" ? n.rolloffFactor : h.rolloffFactor,
                                        panningModel: typeof n.panningModel < "u" ? n.panningModel : h.panningModel,
                                    }
                                    var m = s._panner
                                    m || (s._pos || (s._pos = t._pos || [0, 0, -0.5]), o(s, "spatial"), (m = s._panner)),
                                        (m.coneInnerAngle = h.coneInnerAngle),
                                        (m.coneOuterAngle = h.coneOuterAngle),
                                        (m.coneOuterGain = h.coneOuterGain),
                                        (m.distanceModel = h.distanceModel),
                                        (m.maxDistance = h.maxDistance),
                                        (m.refDistance = h.refDistance),
                                        (m.rolloffFactor = h.rolloffFactor),
                                        (m.panningModel = h.panningModel)
                                }
                            return t
                        }),
                        (Sound.prototype.init = (function (t) {
                            return function () {
                                var e = this,
                                    n = e._parent
                                    ; (e._orientation = n._orientation),
                                        (e._stereo = n._stereo),
                                        (e._pos = n._pos),
                                        (e._pannerAttr = n._pannerAttr),
                                        t.call(this),
                                        e._stereo ? n.stereo(e._stereo) : e._pos && n.pos(e._pos[0], e._pos[1], e._pos[2], e._id)
                            }
                        })(Sound.prototype.init)),
                        (Sound.prototype.reset = (function (t) {
                            return function () {
                                var e = this,
                                    n = e._parent
                                return (
                                    (e._orientation = n._orientation),
                                    (e._stereo = n._stereo),
                                    (e._pos = n._pos),
                                    (e._pannerAttr = n._pannerAttr),
                                    e._stereo
                                        ? n.stereo(e._stereo)
                                        : e._pos
                                            ? n.pos(e._pos[0], e._pos[1], e._pos[2], e._id)
                                            : e._panner && (e._panner.disconnect(0), (e._panner = void 0), n._refreshBuffer(e)),
                                    t.call(this)
                                )
                            }
                        })(Sound.prototype.reset))
                var o = function (t, e) {
                    ; (e = e || "spatial"),
                        e === "spatial"
                            ? ((t._panner = Howler.ctx.createPanner()),
                                (t._panner.coneInnerAngle = t._pannerAttr.coneInnerAngle),
                                (t._panner.coneOuterAngle = t._pannerAttr.coneOuterAngle),
                                (t._panner.coneOuterGain = t._pannerAttr.coneOuterGain),
                                (t._panner.distanceModel = t._pannerAttr.distanceModel),
                                (t._panner.maxDistance = t._pannerAttr.maxDistance),
                                (t._panner.refDistance = t._pannerAttr.refDistance),
                                (t._panner.rolloffFactor = t._pannerAttr.rolloffFactor),
                                (t._panner.panningModel = t._pannerAttr.panningModel),
                                typeof t._panner.positionX < "u"
                                    ? (t._panner.positionX.setValueAtTime(t._pos[0], Howler.ctx.currentTime),
                                        t._panner.positionY.setValueAtTime(t._pos[1], Howler.ctx.currentTime),
                                        t._panner.positionZ.setValueAtTime(t._pos[2], Howler.ctx.currentTime))
                                    : t._panner.setPosition(t._pos[0], t._pos[1], t._pos[2]),
                                typeof t._panner.orientationX < "u"
                                    ? (t._panner.orientationX.setValueAtTime(t._orientation[0], Howler.ctx.currentTime),
                                        t._panner.orientationY.setValueAtTime(t._orientation[1], Howler.ctx.currentTime),
                                        t._panner.orientationZ.setValueAtTime(t._orientation[2], Howler.ctx.currentTime))
                                    : t._panner.setOrientation(t._orientation[0], t._orientation[1], t._orientation[2]))
                            : ((t._panner = Howler.ctx.createStereoPanner()),
                                t._panner.pan.setValueAtTime(t._stereo, Howler.ctx.currentTime)),
                        t._panner.connect(t._node),
                        t._paused || t._parent.pause(t._id, true).play(t._id, true)
                }
            })()
    })
    var lo = qn((ro, zn) => {
        ; (function (o) {
            typeof ro == "object" && typeof zn < "u"
                ? (zn.exports = o())
                : typeof define == "function" && define.amd
                    ? define([], o)
                    : ((typeof window < "u"
                        ? window
                        : typeof global < "u"
                            ? global
                            : typeof self < "u"
                                ? self
                                : this
                    ).basicScroll = o())
        })(function () {
            return (function o(t, e, n) {
                function i(c, h) {
                    if (!e[c]) {
                        if (!t[c]) {
                            var m = typeof Et == "function" && Et
                            if (!h && m) return m(c, true)
                            if (s) return s(c, true)
                            var a = new Error("Cannot find module '" + c + "'")
                            throw ((a.code = "MODULE_NOT_FOUND"), a)
                        }
                        var r = (e[c] = { exports: {} })
                        t[c][0].call(
                            r.exports,
                            function (d) {
                                return i(t[c][1][d] || d)
                            },
                            r,
                            r.exports,
                            o,
                            t,
                            e,
                            n
                        )
                    }
                    return e[c].exports
                }
                for (var s = typeof Et == "function" && Et, l = 0; l < n.length; l++) i(n[l])
                return i
            })(
                {
                    1: [
                        function (o, t, e) {
                            t.exports = function (n) {
                                var i = 2.5949095
                                return (n *= 2) < 1
                                    ? n * n * ((i + 1) * n - i) * 0.5
                                    : 0.5 * ((n -= 2) * n * ((i + 1) * n + i) + 2)
                            }
                        },
                        {},
                    ],
                    2: [
                        function (o, t, e) {
                            t.exports = function (n) {
                                var i = 1.70158
                                return n * n * ((i + 1) * n - i)
                            }
                        },
                        {},
                    ],
                    3: [
                        function (o, t, e) {
                            t.exports = function (n) {
                                var i = 1.70158
                                return --n * n * ((i + 1) * n + i) + 1
                            }
                        },
                        {},
                    ],
                    4: [
                        function (o, t, e) {
                            var n = o("./bounce-out")
                            t.exports = function (i) {
                                return i < 0.5 ? 0.5 * (1 - n(1 - 2 * i)) : 0.5 * n(2 * i - 1) + 0.5
                            }
                        },
                        { "./bounce-out": 6 },
                    ],
                    5: [
                        function (o, t, e) {
                            var n = o("./bounce-out")
                            t.exports = function (i) {
                                return 1 - n(1 - i)
                            }
                        },
                        { "./bounce-out": 6 },
                    ],
                    6: [
                        function (o, t, e) {
                            t.exports = function (n) {
                                var i = n * n
                                return n < 4 / 11
                                    ? 7.5625 * i
                                    : n < 8 / 11
                                        ? 9.075 * i - 9.9 * n + 3.4
                                        : n < 0.9
                                            ? (4356 / 361) * i - (35442 / 1805) * n + 16061 / 1805
                                            : 10.8 * n * n - 20.52 * n + 10.72
                            }
                        },
                        {},
                    ],
                    7: [
                        function (o, t, e) {
                            t.exports = function (n) {
                                return (n *= 2) < 1
                                    ? -0.5 * (Math.sqrt(1 - n * n) - 1)
                                    : 0.5 * (Math.sqrt(1 - (n -= 2) * n) + 1)
                            }
                        },
                        {},
                    ],
                    8: [
                        function (o, t, e) {
                            t.exports = function (n) {
                                return 1 - Math.sqrt(1 - n * n)
                            }
                        },
                        {},
                    ],
                    9: [
                        function (o, t, e) {
                            t.exports = function (n) {
                                return Math.sqrt(1 - --n * n)
                            }
                        },
                        {},
                    ],
                    10: [
                        function (o, t, e) {
                            t.exports = function (n) {
                                return n < 0.5 ? 4 * n * n * n : 0.5 * Math.pow(2 * n - 2, 3) + 1
                            }
                        },
                        {},
                    ],
                    11: [
                        function (o, t, e) {
                            t.exports = function (n) {
                                return n * n * n
                            }
                        },
                        {},
                    ],
                    12: [
                        function (o, t, e) {
                            t.exports = function (n) {
                                var i = n - 1
                                return i * i * i + 1
                            }
                        },
                        {},
                    ],
                    13: [
                        function (o, t, e) {
                            t.exports = function (n) {
                                return n < 0.5
                                    ? 0.5 * Math.sin(((13 * Math.PI) / 2) * 2 * n) * Math.pow(2, 10 * (2 * n - 1))
                                    : 0.5 *
                                    Math.sin(((-13 * Math.PI) / 2) * (2 * n - 1 + 1)) *
                                    Math.pow(2, -10 * (2 * n - 1)) +
                                    1
                            }
                        },
                        {},
                    ],
                    14: [
                        function (o, t, e) {
                            t.exports = function (n) {
                                return Math.sin((13 * n * Math.PI) / 2) * Math.pow(2, 10 * (n - 1))
                            }
                        },
                        {},
                    ],
                    15: [
                        function (o, t, e) {
                            t.exports = function (n) {
                                return Math.sin((-13 * (n + 1) * Math.PI) / 2) * Math.pow(2, -10 * n) + 1
                            }
                        },
                        {},
                    ],
                    16: [
                        function (o, t, e) {
                            t.exports = function (n) {
                                return n === 0 || n === 1
                                    ? n
                                    : n < 0.5
                                        ? 0.5 * Math.pow(2, 20 * n - 10)
                                        : -0.5 * Math.pow(2, 10 - 20 * n) + 1
                            }
                        },
                        {},
                    ],
                    17: [
                        function (o, t, e) {
                            t.exports = function (n) {
                                return n === 0 ? n : Math.pow(2, 10 * (n - 1))
                            }
                        },
                        {},
                    ],
                    18: [
                        function (o, t, e) {
                            t.exports = function (n) {
                                return n === 1 ? n : 1 - Math.pow(2, -10 * n)
                            }
                        },
                        {},
                    ],
                    19: [
                        function (o, t, e) {
                            t.exports = {
                                backInOut: o("./back-in-out"),
                                backIn: o("./back-in"),
                                backOut: o("./back-out"),
                                bounceInOut: o("./bounce-in-out"),
                                bounceIn: o("./bounce-in"),
                                bounceOut: o("./bounce-out"),
                                circInOut: o("./circ-in-out"),
                                circIn: o("./circ-in"),
                                circOut: o("./circ-out"),
                                cubicInOut: o("./cubic-in-out"),
                                cubicIn: o("./cubic-in"),
                                cubicOut: o("./cubic-out"),
                                elasticInOut: o("./elastic-in-out"),
                                elasticIn: o("./elastic-in"),
                                elasticOut: o("./elastic-out"),
                                expoInOut: o("./expo-in-out"),
                                expoIn: o("./expo-in"),
                                expoOut: o("./expo-out"),
                                linear: o("./linear"),
                                quadInOut: o("./quad-in-out"),
                                quadIn: o("./quad-in"),
                                quadOut: o("./quad-out"),
                                quartInOut: o("./quart-in-out"),
                                quartIn: o("./quart-in"),
                                quartOut: o("./quart-out"),
                                quintInOut: o("./quint-in-out"),
                                quintIn: o("./quint-in"),
                                quintOut: o("./quint-out"),
                                sineInOut: o("./sine-in-out"),
                                sineIn: o("./sine-in"),
                                sineOut: o("./sine-out"),
                            }
                        },
                        {
                            "./back-in": 2,
                            "./back-in-out": 1,
                            "./back-out": 3,
                            "./bounce-in": 5,
                            "./bounce-in-out": 4,
                            "./bounce-out": 6,
                            "./circ-in": 8,
                            "./circ-in-out": 7,
                            "./circ-out": 9,
                            "./cubic-in": 11,
                            "./cubic-in-out": 10,
                            "./cubic-out": 12,
                            "./elastic-in": 14,
                            "./elastic-in-out": 13,
                            "./elastic-out": 15,
                            "./expo-in": 17,
                            "./expo-in-out": 16,
                            "./expo-out": 18,
                            "./linear": 20,
                            "./quad-in": 22,
                            "./quad-in-out": 21,
                            "./quad-out": 23,
                            "./quart-in": 25,
                            "./quart-in-out": 24,
                            "./quart-out": 26,
                            "./quint-in": 28,
                            "./quint-in-out": 27,
                            "./quint-out": 29,
                            "./sine-in": 31,
                            "./sine-in-out": 30,
                            "./sine-out": 32,
                        },
                    ],
                    20: [
                        function (o, t, e) {
                            t.exports = function (n) {
                                return n
                            }
                        },
                        {},
                    ],
                    21: [
                        function (o, t, e) {
                            t.exports = function (n) {
                                return (n /= 0.5) < 1 ? 0.5 * n * n : -0.5 * (--n * (n - 2) - 1)
                            }
                        },
                        {},
                    ],
                    22: [
                        function (o, t, e) {
                            t.exports = function (n) {
                                return n * n
                            }
                        },
                        {},
                    ],
                    23: [
                        function (o, t, e) {
                            t.exports = function (n) {
                                return -n * (n - 2)
                            }
                        },
                        {},
                    ],
                    24: [
                        function (o, t, e) {
                            t.exports = function (n) {
                                return n < 0.5 ? 8 * Math.pow(n, 4) : -8 * Math.pow(n - 1, 4) + 1
                            }
                        },
                        {},
                    ],
                    25: [
                        function (o, t, e) {
                            t.exports = function (n) {
                                return Math.pow(n, 4)
                            }
                        },
                        {},
                    ],
                    26: [
                        function (o, t, e) {
                            t.exports = function (n) {
                                return Math.pow(n - 1, 3) * (1 - n) + 1
                            }
                        },
                        {},
                    ],
                    27: [
                        function (o, t, e) {
                            t.exports = function (n) {
                                return (n *= 2) < 1 ? 0.5 * n * n * n * n * n : 0.5 * ((n -= 2) * n * n * n * n + 2)
                            }
                        },
                        {},
                    ],
                    28: [
                        function (o, t, e) {
                            t.exports = function (n) {
                                return n * n * n * n * n
                            }
                        },
                        {},
                    ],
                    29: [
                        function (o, t, e) {
                            t.exports = function (n) {
                                return --n * n * n * n * n + 1
                            }
                        },
                        {},
                    ],
                    30: [
                        function (o, t, e) {
                            t.exports = function (n) {
                                return -0.5 * (Math.cos(Math.PI * n) - 1)
                            }
                        },
                        {},
                    ],
                    31: [
                        function (o, t, e) {
                            t.exports = function (n) {
                                var i = Math.cos(n * Math.PI * 0.5)
                                return Math.abs(i) < 1e-14 ? 1 : 1 - i
                            }
                        },
                        {},
                    ],
                    32: [
                        function (o, t, e) {
                            t.exports = function (n) {
                                return Math.sin((n * Math.PI) / 2)
                            }
                        },
                        {},
                    ],
                    33: [
                        function (o, t, e) {
                            t.exports = function (n, i) {
                                i || (i = [0, ""]), (n = String(n))
                                var s = parseFloat(n, 10)
                                return (i[0] = s), (i[1] = n.match(/[\d.\-\+]*\s*(.*)/)[1] || ""), i
                            }
                        },
                        {},
                    ],
                    34: [
                        function (o, t, e) {
                            "use strict"
                            Object.defineProperty(e, "__esModule", { value: true }), (e.create = void 0)
                            var n = s(o("parse-unit")),
                                i = s(o("eases"))
                            function s(E) {
                                return E && E.__esModule ? E : { default: E }
                            }
                            function l(E) {
                                return (l =
                                    typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
                                        ? function (W) {
                                            return typeof W
                                        }
                                        : function (W) {
                                            return W &&
                                                typeof Symbol == "function" &&
                                                W.constructor === Symbol &&
                                                W !== Symbol.prototype
                                                ? "symbol"
                                                : typeof W
                                        })(E)
                            }
                            var c,
                                h,
                                m,
                                a = [],
                                r = typeof window < "u",
                                d = function () {
                                    return (document.scrollingElement || document.documentElement).scrollTop
                                },
                                u = function () {
                                    return window.innerHeight || window.outerHeight
                                },
                                p = function (E) {
                                    return isNaN((0, n.default)(E)[0]) === false
                                },
                                f = function (E) {
                                    var W = (0, n.default)(E)
                                    return { value: W[0], unit: W[1] }
                                },
                                Q = function (E) {
                                    return String(E).match(/^[a-z]+-[a-z]+$/) !== null
                                },
                                b = function (E, W) {
                                    return E === true ? W.elem : E instanceof HTMLElement ? W.direct : W.global
                                },
                                g = function (E, W) {
                                    var y = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : d(),
                                        w = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : u(),
                                        k = W.getBoundingClientRect(),
                                        U = E.match(/^[a-z]+/)[0],
                                        S = E.match(/[a-z]+$/)[0],
                                        T = 0
                                    return (
                                        S === "top" && (T -= 0),
                                        S === "middle" && (T -= w / 2),
                                        S === "bottom" && (T -= w),
                                        U === "top" && (T += k.top + y),
                                        U === "middle" && (T += k.top + y + k.height / 2),
                                        U === "bottom" && (T += k.top + y + k.height),
                                        "".concat(T, "px")
                                    )
                                },
                                B = function (E) {
                                    var W = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : d(),
                                        y = E.getData(),
                                        w = y.to.value - y.from.value,
                                        k = W - y.from.value,
                                        U = k / (w / 100),
                                        S = Math.min(Math.max(U, 0), 100),
                                        T = b(y.direct, {
                                            global: document.documentElement,
                                            elem: y.elem,
                                            direct: y.direct,
                                        }),
                                        L = Object.keys(y.props).reduce(function (Jt, zt) {
                                            var lt = y.props[zt],
                                                Ht = lt.from.unit || lt.to.unit,
                                                ho = lt.from.value - lt.to.value,
                                                uo = lt.timing(S / 100),
                                                mo = lt.from.value - ho * uo,
                                                po = Math.round(1e4 * mo) / 1e4
                                            return (Jt[zt] = po + Ht), Jt
                                        }, {}),
                                        Y = U >= 0 && U <= 100,
                                        ke = U < 0 || U > 100
                                    return (
                                        Y === true && y.inside(E, U, L),
                                        ke === true && y.outside(E, U, L),
                                        { elem: T, props: L }
                                    )
                                },
                                x = function (E, W) {
                                    Object.keys(W).forEach(function (y) {
                                        return (function (w, k) {
                                            w.style.setProperty(k.key, k.value)
                                        })(E, { key: y, value: W[y] })
                                    })
                                }
                                ; (e.create = function (E) {
                                    var W = null,
                                        y = false,
                                        w = {
                                            isActive: function () {
                                                return y
                                            },
                                            getData: function () {
                                                return W
                                            },
                                            calculate: function () {
                                                W = (function () {
                                                    var U =
                                                        arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}
                                                    if (
                                                        ((U = Object.assign({}, U)).inside == null &&
                                                            (U.inside = function () { }),
                                                            U.outside == null && (U.outside = function () { }),
                                                            U.direct == null && (U.direct = false),
                                                            U.track == null && (U.track = true),
                                                            U.props == null && (U.props = {}),
                                                            U.from == null)
                                                    )
                                                        throw new Error("Missing property `from`")
                                                    if (U.to == null) throw new Error("Missing property `to`")
                                                    if (typeof U.inside != "function")
                                                        throw new Error("Property `inside` must be undefined or a function")
                                                    if (typeof U.outside != "function")
                                                        throw new Error(
                                                            "Property `outside` must be undefined or a function"
                                                        )
                                                    if (
                                                        typeof U.direct != "boolean" &&
                                                        U.direct instanceof HTMLElement == 0
                                                    )
                                                        throw new Error(
                                                            "Property `direct` must be undefined, a boolean or a DOM element/node"
                                                        )
                                                    if (U.direct === true && U.elem == null)
                                                        throw new Error("Property `elem` is required when `direct` is true")
                                                    if (typeof U.track != "boolean")
                                                        throw new Error("Property `track` must be undefined or a boolean")
                                                    if (l(U.props) !== "object")
                                                        throw new Error("Property `props` must be undefined or an object")
                                                    if (U.elem == null) {
                                                        if (p(U.from) === false)
                                                            throw new Error(
                                                                "Property `from` must be a absolute value when no `elem` has been provided"
                                                            )
                                                        if (p(U.to) === false)
                                                            throw new Error(
                                                                "Property `to` must be a absolute value when no `elem` has been provided"
                                                            )
                                                    } else
                                                        Q(U.from) === true && (U.from = g(U.from, U.elem)),
                                                            Q(U.to) === true && (U.to = g(U.to, U.elem))
                                                    return (
                                                        (U.from = f(U.from)),
                                                        (U.to = f(U.to)),
                                                        (U.props = Object.keys(U.props).reduce(function (S, T) {
                                                            var L = Object.assign({}, U.props[T])
                                                            if (p(L.from) === false)
                                                                throw new Error(
                                                                    "Property `from` of prop must be a absolute value"
                                                                )
                                                            if (p(L.to) === false)
                                                                throw new Error(
                                                                    "Property `from` of prop must be a absolute value"
                                                                )
                                                            if (
                                                                ((L.from = f(L.from)),
                                                                    (L.to = f(L.to)),
                                                                    L.timing == null && (L.timing = i.default.linear),
                                                                    typeof L.timing != "string" &&
                                                                    typeof L.timing != "function")
                                                            )
                                                                throw new Error(
                                                                    "Property `timing` of prop must be undefined, a string or a function"
                                                                )
                                                            if (typeof L.timing == "string" && i.default[L.timing] == null)
                                                                throw new Error(
                                                                    "Unknown timing for property `timing` of prop"
                                                                )
                                                            return (
                                                                typeof L.timing == "string" &&
                                                                (L.timing = i.default[L.timing]),
                                                                (S[T] = L),
                                                                S
                                                            )
                                                        }, {})),
                                                        U
                                                    )
                                                })(E)
                                            },
                                            update: function () {
                                                var U = B(w),
                                                    S = U.elem,
                                                    T = U.props
                                                return x(S, T), T
                                            },
                                            start: function () {
                                                y = true
                                            },
                                            stop: function () {
                                                y = false
                                            },
                                            destroy: function () {
                                                a[k] = void 0
                                            },
                                        },
                                        k = a.push(w) - 1
                                    return w.calculate(), w
                                }),
                                    r === true
                                        ? ((function E(W, y) {
                                            var w = function () {
                                                requestAnimationFrame(function () {
                                                    return E(W, y)
                                                })
                                            },
                                                k = (function (S) {
                                                    return S.filter(function (T) {
                                                        return T != null && T.isActive()
                                                    })
                                                })(a)
                                            if (k.length === 0) return w()
                                            var U = d()
                                            if (y === U) return w()
                                                ; (y = U),
                                                    k
                                                        .map(function (S) {
                                                            return B(S, U)
                                                        })
                                                        .forEach(function (S) {
                                                            var T = S.elem,
                                                                L = S.props
                                                            return x(T, L)
                                                        }),
                                                    w()
                                        })(),
                                            window.addEventListener(
                                                "resize",
                                                ((c = function () {
                                                    ; (function (E) {
                                                        return E.filter(function (W) {
                                                            return W != null && W.getData().track
                                                        })
                                                    })(a).forEach(function (E) {
                                                        E.calculate(), E.update()
                                                    })
                                                }),
                                                    (h = 50),
                                                    (m = null),
                                                    function () {
                                                        for (var E = arguments.length, W = new Array(E), y = 0; y < E; y++)
                                                            W[y] = arguments[y]
                                                        clearTimeout(m),
                                                            (m = setTimeout(function () {
                                                                return c.apply(void 0, W)
                                                            }, h))
                                                    })
                                            ))
                                        : console.warn(
                                            "basicScroll is not executing because you are using it in an environment without a `window` object"
                                        )
                        },
                        { eases: 19, "parse-unit": 33 },
                    ],
                },
                {},
                [34]
            )(34)
        })
    })
    var De = class {
        constructor(t, e, n) {
            ; (this.eventTarget = t), (this.eventName = e), (this.eventOptions = n), (this.unorderedBindings = new Set())
        }
        connect() {
            this.eventTarget.addEventListener(this.eventName, this, this.eventOptions)
        }
        disconnect() {
            this.eventTarget.removeEventListener(this.eventName, this, this.eventOptions)
        }
        bindingConnected(t) {
            this.unorderedBindings.add(t)
        }
        bindingDisconnected(t) {
            this.unorderedBindings.delete(t)
        }
        handleEvent(t) {
            let e = vo(t)
            for (let n of this.bindings) {
                if (e.immediatePropagationStopped) break
                n.handleEvent(e)
            }
        }
        hasBindings() {
            return this.unorderedBindings.size > 0
        }
        get bindings() {
            return Array.from(this.unorderedBindings).sort((t, e) => {
                let n = t.index,
                    i = e.index
                return n < i ? -1 : n > i ? 1 : 0
            })
        }
    }
    function vo(o) {
        if ("immediatePropagationStopped" in o) return o
        {
            let { stopImmediatePropagation: t } = o
            return Object.assign(o, {
                immediatePropagationStopped: false,
                stopImmediatePropagation() {
                    ; (this.immediatePropagationStopped = true), t.call(this)
                },
            })
        }
    }
    var Ge = class {
        constructor(t) {
            ; (this.application = t), (this.eventListenerMaps = new Map()), (this.started = false)
        }
        start() {
            this.started || ((this.started = true), this.eventListeners.forEach(t => t.connect()))
        }
        stop() {
            this.started && ((this.started = false), this.eventListeners.forEach(t => t.disconnect()))
        }
        get eventListeners() {
            return Array.from(this.eventListenerMaps.values()).reduce(
                (t, e) => t.concat(Array.from(e.values())),
                []
            )
        }
        bindingConnected(t) {
            this.fetchEventListenerForBinding(t).bindingConnected(t)
        }
        bindingDisconnected(t, e = false) {
            this.fetchEventListenerForBinding(t).bindingDisconnected(t), e && this.clearEventListenersForBinding(t)
        }
        handleError(t, e, n = {}) {
            this.application.handleError(t, `Error ${e}`, n)
        }
        clearEventListenersForBinding(t) {
            let e = this.fetchEventListenerForBinding(t)
            e.hasBindings() || (e.disconnect(), this.removeMappedEventListenerFor(t))
        }
        removeMappedEventListenerFor(t) {
            let { eventTarget: e, eventName: n, eventOptions: i } = t,
                s = this.fetchEventListenerMapForEventTarget(e),
                l = this.cacheKey(n, i)
            s.delete(l), s.size == 0 && this.eventListenerMaps.delete(e)
        }
        fetchEventListenerForBinding(t) {
            let { eventTarget: e, eventName: n, eventOptions: i } = t
            return this.fetchEventListener(e, n, i)
        }
        fetchEventListener(t, e, n) {
            let i = this.fetchEventListenerMapForEventTarget(t),
                s = this.cacheKey(e, n),
                l = i.get(s)
            return l || ((l = this.createEventListener(t, e, n)), i.set(s, l)), l
        }
        createEventListener(t, e, n) {
            let i = new De(t, e, n)
            return this.started && i.connect(), i
        }
        fetchEventListenerMapForEventTarget(t) {
            let e = this.eventListenerMaps.get(t)
            return e || ((e = new Map()), this.eventListenerMaps.set(t, e)), e
        }
        cacheKey(t, e) {
            let n = [t]
            return (
                Object.keys(e)
                    .sort()
                    .forEach(i => {
                        n.push(`${e[i] ? "" : "!"}${i}`)
                    }),
                n.join(":")
            )
        }
    },
        yo = {
            stop({ event: o, value: t }) {
                return t && o.stopPropagation(), true
            },
            prevent({ event: o, value: t }) {
                return t && o.preventDefault(), true
            },
            self({ event: o, value: t, element: e }) {
                return t ? e === o.target : true
            },
        },
        Eo = /^(?:(?:([^.]+?)\+)?(.+?)(?:\.(.+?))?(?:@(window|document))?->)?(.+?)(?:#([^:]+?))(?::(.+))?$/
    function xo(o) {
        let e = o.trim().match(Eo) || [],
            n = e[2],
            i = e[3]
        return (
            i && !["keydown", "keyup", "keypress"].includes(n) && ((n += `.${i}`), (i = "")),
            {
                eventTarget: wo(e[4]),
                eventName: n,
                eventOptions: e[7] ? Wo(e[7]) : {},
                identifier: e[5],
                methodName: e[6],
                keyFilter: e[1] || i,
            }
        )
    }
    function wo(o) {
        if (o == "window") return window
        if (o == "document") return document
    }
    function Wo(o) {
        return o.split(":").reduce((t, e) => Object.assign(t, { [e.replace(/^!/, "")]: !/^!/.test(e) }), {})
    }
    function Lo(o) {
        if (o == window) return "window"
        if (o == document) return "document"
    }
    function ln(o) {
        return o.replace(/(?:[_-])([a-z0-9])/g, (t, e) => e.toUpperCase())
    }
    function Ie(o) {
        return ln(o.replace(/--/g, "-").replace(/__/g, "_"))
    }
    function wt(o) {
        return o.charAt(0).toUpperCase() + o.slice(1)
    }
    function ci(o) {
        return o.replace(/([A-Z])/g, (t, e) => `-${e.toLowerCase()}`)
    }
    function Vo(o) {
        return o.match(/[^\s]+/g) || []
    }
    function ti(o) {
        return o != null
    }
    function _e(o, t) {
        return Object.prototype.hasOwnProperty.call(o, t)
    }
    var ei = ["meta", "ctrl", "alt", "shift"],
        Ne = class {
            constructor(t, e, n, i) {
                ; (this.element = t),
                    (this.index = e),
                    (this.eventTarget = n.eventTarget || t),
                    (this.eventName = n.eventName || Ro(t) || Kt("missing event name")),
                    (this.eventOptions = n.eventOptions || {}),
                    (this.identifier = n.identifier || Kt("missing identifier")),
                    (this.methodName = n.methodName || Kt("missing method name")),
                    (this.keyFilter = n.keyFilter || ""),
                    (this.schema = i)
            }
            static forToken(t, e) {
                return new this(t.element, t.index, xo(t.content), e)
            }
            toString() {
                let t = this.keyFilter ? `.${this.keyFilter}` : "",
                    e = this.eventTargetName ? `@${this.eventTargetName}` : ""
                return `${this.eventName}${t}${e}->${this.identifier}#${this.methodName}`
            }
            shouldIgnoreKeyboardEvent(t) {
                if (!this.keyFilter) return false
                let e = this.keyFilter.split("+")
                if (this.keyFilterDissatisfied(t, e)) return true
                let n = e.filter(i => !ei.includes(i))[0]
                return n
                    ? (_e(this.keyMappings, n) || Kt(`contains unknown key filter: ${this.keyFilter}`),
                        this.keyMappings[n].toLowerCase() !== t.key.toLowerCase())
                    : false
            }
            shouldIgnoreMouseEvent(t) {
                if (!this.keyFilter) return false
                let e = [this.keyFilter]
                return !!this.keyFilterDissatisfied(t, e)
            }
            get params() {
                let t = {},
                    e = new RegExp(`^data-${this.identifier}-(.+)-param$`, "i")
                for (let { name: n, value: i } of Array.from(this.element.attributes)) {
                    let s = n.match(e),
                        l = s && s[1]
                    l && (t[ln(l)] = Zo(i))
                }
                return t
            }
            get eventTargetName() {
                return Lo(this.eventTarget)
            }
            get keyMappings() {
                return this.schema.keyMappings
            }
            keyFilterDissatisfied(t, e) {
                let [n, i, s, l] = ei.map(c => e.includes(c))
                return t.metaKey !== n || t.ctrlKey !== i || t.altKey !== s || t.shiftKey !== l
            }
        },
        ni = {
            a: () => "click",
            button: () => "click",
            form: () => "submit",
            details: () => "toggle",
            input: o => (o.getAttribute("type") == "submit" ? "click" : "input"),
            select: () => "change",
            textarea: () => "input",
        }
    function Ro(o) {
        let t = o.tagName.toLowerCase()
        if (t in ni) return ni[t](o)
    }
    function Kt(o) {
        throw new Error(o)
    }
    function Zo(o) {
        try {
            return JSON.parse(o)
        } catch {
            return o
        }
    }
    var Xe = class {
        constructor(t, e) {
            ; (this.context = t), (this.action = e)
        }
        get index() {
            return this.action.index
        }
        get eventTarget() {
            return this.action.eventTarget
        }
        get eventOptions() {
            return this.action.eventOptions
        }
        get identifier() {
            return this.context.identifier
        }
        handleEvent(t) {
            let e = this.prepareActionEvent(t)
            this.willBeInvokedByEvent(t) && this.applyEventModifiers(e) && this.invokeWithEvent(e)
        }
        get eventName() {
            return this.action.eventName
        }
        get method() {
            let t = this.controller[this.methodName]
            if (typeof t == "function") return t
            throw new Error(`Action "${this.action}" references undefined method "${this.methodName}"`)
        }
        applyEventModifiers(t) {
            let { element: e } = this.action,
                { actionDescriptorFilters: n } = this.context.application,
                { controller: i } = this.context,
                s = true
            for (let [l, c] of Object.entries(this.eventOptions))
                if (l in n) {
                    let h = n[l]
                    s = s && h({ name: l, value: c, event: t, element: e, controller: i })
                } else continue
            return s
        }
        prepareActionEvent(t) {
            return Object.assign(t, { params: this.action.params })
        }
        invokeWithEvent(t) {
            let { target: e, currentTarget: n } = t
            try {
                this.method.call(this.controller, t),
                    this.context.logDebugActivity(this.methodName, {
                        event: t,
                        target: e,
                        currentTarget: n,
                        action: this.methodName,
                    })
            } catch (i) {
                let { identifier: s, controller: l, element: c, index: h } = this,
                    m = {
                        identifier: s,
                        controller: l,
                        element: c,
                        index: h,
                        event: t,
                    }
                this.context.handleError(i, `invoking action "${this.action}"`, m)
            }
        }
        willBeInvokedByEvent(t) {
            let e = t.target
            return (t instanceof KeyboardEvent && this.action.shouldIgnoreKeyboardEvent(t)) ||
                (t instanceof MouseEvent && this.action.shouldIgnoreMouseEvent(t))
                ? false
                : this.element === e
                    ? true
                    : e instanceof Element && this.element.contains(e)
                        ? this.scope.containsElement(e)
                        : this.scope.containsElement(this.action.element)
        }
        get controller() {
            return this.context.controller
        }
        get methodName() {
            return this.action.methodName
        }
        get element() {
            return this.scope.element
        }
        get scope() {
            return this.context.scope
        }
    },
        $t = class {
            constructor(t, e) {
                ; (this.mutationObserverInit = {
                    attributes: true,
                    childList: true,
                    subtree: true,
                }),
                    (this.element = t),
                    (this.started = false),
                    (this.delegate = e),
                    (this.elements = new Set()),
                    (this.mutationObserver = new MutationObserver(n => this.processMutations(n)))
            }
            start() {
                this.started ||
                    ((this.started = true),
                        this.mutationObserver.observe(this.element, this.mutationObserverInit),
                        this.refresh())
            }
            pause(t) {
                this.started && (this.mutationObserver.disconnect(), (this.started = false)),
                    t(),
                    this.started ||
                    (this.mutationObserver.observe(this.element, this.mutationObserverInit), (this.started = true))
            }
            stop() {
                this.started &&
                    (this.mutationObserver.takeRecords(), this.mutationObserver.disconnect(), (this.started = false))
            }
            refresh() {
                if (this.started) {
                    let t = new Set(this.matchElementsInTree())
                    for (let e of Array.from(this.elements)) t.has(e) || this.removeElement(e)
                    for (let e of Array.from(t)) this.addElement(e)
                }
            }
            processMutations(t) {
                if (this.started) for (let e of t) this.processMutation(e)
            }
            processMutation(t) {
                t.type == "attributes"
                    ? this.processAttributeChange(t.target, t.attributeName)
                    : t.type == "childList" &&
                    (this.processRemovedNodes(t.removedNodes), this.processAddedNodes(t.addedNodes))
            }
            processAttributeChange(t, e) {
                this.elements.has(t)
                    ? this.delegate.elementAttributeChanged && this.matchElement(t)
                        ? this.delegate.elementAttributeChanged(t, e)
                        : this.removeElement(t)
                    : this.matchElement(t) && this.addElement(t)
            }
            processRemovedNodes(t) {
                for (let e of Array.from(t)) {
                    let n = this.elementFromNode(e)
                    n && this.processTree(n, this.removeElement)
                }
            }
            processAddedNodes(t) {
                for (let e of Array.from(t)) {
                    let n = this.elementFromNode(e)
                    n && this.elementIsActive(n) && this.processTree(n, this.addElement)
                }
            }
            matchElement(t) {
                return this.delegate.matchElement(t)
            }
            matchElementsInTree(t = this.element) {
                return this.delegate.matchElementsInTree(t)
            }
            processTree(t, e) {
                for (let n of this.matchElementsInTree(t)) e.call(this, n)
            }
            elementFromNode(t) {
                if (t.nodeType == Node.ELEMENT_NODE) return t
            }
            elementIsActive(t) {
                return t.isConnected != this.element.isConnected ? false : this.element.contains(t)
            }
            addElement(t) {
                this.elements.has(t) ||
                    (this.elementIsActive(t) &&
                        (this.elements.add(t), this.delegate.elementMatched && this.delegate.elementMatched(t)))
            }
            removeElement(t) {
                this.elements.has(t) &&
                    (this.elements.delete(t), this.delegate.elementUnmatched && this.delegate.elementUnmatched(t))
            }
        },
        qt = class {
            constructor(t, e, n) {
                ; (this.attributeName = e), (this.delegate = n), (this.elementObserver = new $t(t, this))
            }
            get element() {
                return this.elementObserver.element
            }
            get selector() {
                return `[${this.attributeName}]`
            }
            start() {
                this.elementObserver.start()
            }
            pause(t) {
                this.elementObserver.pause(t)
            }
            stop() {
                this.elementObserver.stop()
            }
            refresh() {
                this.elementObserver.refresh()
            }
            get started() {
                return this.elementObserver.started
            }
            matchElement(t) {
                return t.hasAttribute(this.attributeName)
            }
            matchElementsInTree(t) {
                let e = this.matchElement(t) ? [t] : [],
                    n = Array.from(t.querySelectorAll(this.selector))
                return e.concat(n)
            }
            elementMatched(t) {
                this.delegate.elementMatchedAttribute && this.delegate.elementMatchedAttribute(t, this.attributeName)
            }
            elementUnmatched(t) {
                this.delegate.elementUnmatchedAttribute &&
                    this.delegate.elementUnmatchedAttribute(t, this.attributeName)
            }
            elementAttributeChanged(t, e) {
                this.delegate.elementAttributeValueChanged &&
                    this.attributeName == e &&
                    this.delegate.elementAttributeValueChanged(t, e)
            }
        }
    function Oo(o, t, e) {
        di(o, t).add(e)
    }
    function To(o, t, e) {
        di(o, t).delete(e), Co(o, t)
    }
    function di(o, t) {
        let e = o.get(t)
        return e || ((e = new Set()), o.set(t, e)), e
    }
    function Co(o, t) {
        let e = o.get(t)
        e != null && e.size == 0 && o.delete(t)
    }
    var it = class {
        constructor() {
            this.valuesByKey = new Map()
        }
        get keys() {
            return Array.from(this.valuesByKey.keys())
        }
        get values() {
            return Array.from(this.valuesByKey.values()).reduce((e, n) => e.concat(Array.from(n)), [])
        }
        get size() {
            return Array.from(this.valuesByKey.values()).reduce((e, n) => e + n.size, 0)
        }
        add(t, e) {
            Oo(this.valuesByKey, t, e)
        }
        delete(t, e) {
            To(this.valuesByKey, t, e)
        }
        has(t, e) {
            let n = this.valuesByKey.get(t)
            return n != null && n.has(e)
        }
        hasKey(t) {
            return this.valuesByKey.has(t)
        }
        hasValue(t) {
            return Array.from(this.valuesByKey.values()).some(n => n.has(t))
        }
        getValuesForKey(t) {
            let e = this.valuesByKey.get(t)
            return e ? Array.from(e) : []
        }
        getKeysForValue(t) {
            return Array.from(this.valuesByKey)
                .filter(([e, n]) => n.has(t))
                .map(([e, n]) => e)
        }
    }
    var Ae = class {
        constructor(t, e, n, i) {
            ; (this._selector = e),
                (this.details = i),
                (this.elementObserver = new $t(t, this)),
                (this.delegate = n),
                (this.matchesByElement = new it())
        }
        get started() {
            return this.elementObserver.started
        }
        get selector() {
            return this._selector
        }
        set selector(t) {
            ; (this._selector = t), this.refresh()
        }
        start() {
            this.elementObserver.start()
        }
        pause(t) {
            this.elementObserver.pause(t)
        }
        stop() {
            this.elementObserver.stop()
        }
        refresh() {
            this.elementObserver.refresh()
        }
        get element() {
            return this.elementObserver.element
        }
        matchElement(t) {
            let { selector: e } = this
            if (e) {
                let n = t.matches(e)
                return this.delegate.selectorMatchElement
                    ? n && this.delegate.selectorMatchElement(t, this.details)
                    : n
            } else return false
        }
        matchElementsInTree(t) {
            let { selector: e } = this
            if (e) {
                let n = this.matchElement(t) ? [t] : [],
                    i = Array.from(t.querySelectorAll(e)).filter(s => this.matchElement(s))
                return n.concat(i)
            } else return []
        }
        elementMatched(t) {
            let { selector: e } = this
            e && this.selectorMatched(t, e)
        }
        elementUnmatched(t) {
            let e = this.matchesByElement.getKeysForValue(t)
            for (let n of e) this.selectorUnmatched(t, n)
        }
        elementAttributeChanged(t, e) {
            let { selector: n } = this
            if (n) {
                let i = this.matchElement(t),
                    s = this.matchesByElement.has(n, t)
                i && !s ? this.selectorMatched(t, n) : !i && s && this.selectorUnmatched(t, n)
            }
        }
        selectorMatched(t, e) {
            this.delegate.selectorMatched(t, e, this.details), this.matchesByElement.add(e, t)
        }
        selectorUnmatched(t, e) {
            this.delegate.selectorUnmatched(t, e, this.details), this.matchesByElement.delete(e, t)
        }
    },
        Ye = class {
            constructor(t, e) {
                ; (this.element = t),
                    (this.delegate = e),
                    (this.started = false),
                    (this.stringMap = new Map()),
                    (this.mutationObserver = new MutationObserver(n => this.processMutations(n)))
            }
            start() {
                this.started ||
                    ((this.started = true),
                        this.mutationObserver.observe(this.element, {
                            attributes: true,
                            attributeOldValue: true,
                        }),
                        this.refresh())
            }
            stop() {
                this.started &&
                    (this.mutationObserver.takeRecords(), this.mutationObserver.disconnect(), (this.started = false))
            }
            refresh() {
                if (this.started) for (let t of this.knownAttributeNames) this.refreshAttribute(t, null)
            }
            processMutations(t) {
                if (this.started) for (let e of t) this.processMutation(e)
            }
            processMutation(t) {
                let e = t.attributeName
                e && this.refreshAttribute(e, t.oldValue)
            }
            refreshAttribute(t, e) {
                let n = this.delegate.getStringMapKeyForAttribute(t)
                if (n != null) {
                    this.stringMap.has(t) || this.stringMapKeyAdded(n, t)
                    let i = this.element.getAttribute(t)
                    if ((this.stringMap.get(t) != i && this.stringMapValueChanged(i, n, e), i == null)) {
                        let s = this.stringMap.get(t)
                        this.stringMap.delete(t), s && this.stringMapKeyRemoved(n, t, s)
                    } else this.stringMap.set(t, i)
                }
            }
            stringMapKeyAdded(t, e) {
                this.delegate.stringMapKeyAdded && this.delegate.stringMapKeyAdded(t, e)
            }
            stringMapValueChanged(t, e, n) {
                this.delegate.stringMapValueChanged && this.delegate.stringMapValueChanged(t, e, n)
            }
            stringMapKeyRemoved(t, e, n) {
                this.delegate.stringMapKeyRemoved && this.delegate.stringMapKeyRemoved(t, e, n)
            }
            get knownAttributeNames() {
                return Array.from(new Set(this.currentAttributeNames.concat(this.recordedAttributeNames)))
            }
            get currentAttributeNames() {
                return Array.from(this.element.attributes).map(t => t.name)
            }
            get recordedAttributeNames() {
                return Array.from(this.stringMap.keys())
            }
        },
        te = class {
            constructor(t, e, n) {
                ; (this.attributeObserver = new qt(t, e, this)), (this.delegate = n), (this.tokensByElement = new it())
            }
            get started() {
                return this.attributeObserver.started
            }
            start() {
                this.attributeObserver.start()
            }
            pause(t) {
                this.attributeObserver.pause(t)
            }
            stop() {
                this.attributeObserver.stop()
            }
            refresh() {
                this.attributeObserver.refresh()
            }
            get element() {
                return this.attributeObserver.element
            }
            get attributeName() {
                return this.attributeObserver.attributeName
            }
            elementMatchedAttribute(t) {
                this.tokensMatched(this.readTokensForElement(t))
            }
            elementAttributeValueChanged(t) {
                let [e, n] = this.refreshTokensForElement(t)
                this.tokensUnmatched(e), this.tokensMatched(n)
            }
            elementUnmatchedAttribute(t) {
                this.tokensUnmatched(this.tokensByElement.getValuesForKey(t))
            }
            tokensMatched(t) {
                t.forEach(e => this.tokenMatched(e))
            }
            tokensUnmatched(t) {
                t.forEach(e => this.tokenUnmatched(e))
            }
            tokenMatched(t) {
                this.delegate.tokenMatched(t), this.tokensByElement.add(t.element, t)
            }
            tokenUnmatched(t) {
                this.delegate.tokenUnmatched(t), this.tokensByElement.delete(t.element, t)
            }
            refreshTokensForElement(t) {
                let e = this.tokensByElement.getValuesForKey(t),
                    n = this.readTokensForElement(t),
                    i = So(e, n).findIndex(([s, l]) => !ko(s, l))
                return i == -1 ? [[], []] : [e.slice(i), n.slice(i)]
            }
            readTokensForElement(t) {
                let e = this.attributeName,
                    n = t.getAttribute(e) || ""
                return Mo(n, t, e)
            }
        }
    function Mo(o, t, e) {
        return o
            .trim()
            .split(/\s+/)
            .filter(n => n.length)
            .map((n, i) => ({ element: t, attributeName: e, content: n, index: i }))
    }
    function So(o, t) {
        let e = Math.max(o.length, t.length)
        return Array.from({ length: e }, (n, i) => [o[i], t[i]])
    }
    function ko(o, t) {
        return o && t && o.index == t.index && o.content == t.content
    }
    var ee = class {
        constructor(t, e, n) {
            ; (this.tokenListObserver = new te(t, e, this)),
                (this.delegate = n),
                (this.parseResultsByToken = new WeakMap()),
                (this.valuesByTokenByElement = new WeakMap())
        }
        get started() {
            return this.tokenListObserver.started
        }
        start() {
            this.tokenListObserver.start()
        }
        stop() {
            this.tokenListObserver.stop()
        }
        refresh() {
            this.tokenListObserver.refresh()
        }
        get element() {
            return this.tokenListObserver.element
        }
        get attributeName() {
            return this.tokenListObserver.attributeName
        }
        tokenMatched(t) {
            let { element: e } = t,
                { value: n } = this.fetchParseResultForToken(t)
            n && (this.fetchValuesByTokenForElement(e).set(t, n), this.delegate.elementMatchedValue(e, n))
        }
        tokenUnmatched(t) {
            let { element: e } = t,
                { value: n } = this.fetchParseResultForToken(t)
            n && (this.fetchValuesByTokenForElement(e).delete(t), this.delegate.elementUnmatchedValue(e, n))
        }
        fetchParseResultForToken(t) {
            let e = this.parseResultsByToken.get(t)
            return e || ((e = this.parseToken(t)), this.parseResultsByToken.set(t, e)), e
        }
        fetchValuesByTokenForElement(t) {
            let e = this.valuesByTokenByElement.get(t)
            return e || ((e = new Map()), this.valuesByTokenByElement.set(t, e)), e
        }
        parseToken(t) {
            try {
                return { value: this.delegate.parseValueForToken(t) }
            } catch (e) {
                return { error: e }
            }
        }
    },
        Je = class {
            constructor(t, e) {
                ; (this.context = t), (this.delegate = e), (this.bindingsByAction = new Map())
            }
            start() {
                this.valueListObserver ||
                    ((this.valueListObserver = new ee(this.element, this.actionAttribute, this)),
                        this.valueListObserver.start())
            }
            stop() {
                this.valueListObserver &&
                    (this.valueListObserver.stop(), delete this.valueListObserver, this.disconnectAllActions())
            }
            get element() {
                return this.context.element
            }
            get identifier() {
                return this.context.identifier
            }
            get actionAttribute() {
                return this.schema.actionAttribute
            }
            get schema() {
                return this.context.schema
            }
            get bindings() {
                return Array.from(this.bindingsByAction.values())
            }
            connectAction(t) {
                let e = new Xe(this.context, t)
                this.bindingsByAction.set(t, e), this.delegate.bindingConnected(e)
            }
            disconnectAction(t) {
                let e = this.bindingsByAction.get(t)
                e && (this.bindingsByAction.delete(t), this.delegate.bindingDisconnected(e))
            }
            disconnectAllActions() {
                this.bindings.forEach(t => this.delegate.bindingDisconnected(t, true)), this.bindingsByAction.clear()
            }
            parseValueForToken(t) {
                let e = Ne.forToken(t, this.schema)
                if (e.identifier == this.identifier) return e
            }
            elementMatchedValue(t, e) {
                this.connectAction(e)
            }
            elementUnmatchedValue(t, e) {
                this.disconnectAction(e)
            }
        },
        ze = class {
            constructor(t, e) {
                ; (this.context = t),
                    (this.receiver = e),
                    (this.stringMapObserver = new Ye(this.element, this)),
                    (this.valueDescriptorMap = this.controller.valueDescriptorMap)
            }
            start() {
                this.stringMapObserver.start(), this.invokeChangedCallbacksForDefaultValues()
            }
            stop() {
                this.stringMapObserver.stop()
            }
            get element() {
                return this.context.element
            }
            get controller() {
                return this.context.controller
            }
            getStringMapKeyForAttribute(t) {
                if (t in this.valueDescriptorMap) return this.valueDescriptorMap[t].name
            }
            stringMapKeyAdded(t, e) {
                let n = this.valueDescriptorMap[e]
                this.hasValue(t) || this.invokeChangedCallback(t, n.writer(this.receiver[t]), n.writer(n.defaultValue))
            }
            stringMapValueChanged(t, e, n) {
                let i = this.valueDescriptorNameMap[e]
                t !== null && (n === null && (n = i.writer(i.defaultValue)), this.invokeChangedCallback(e, t, n))
            }
            stringMapKeyRemoved(t, e, n) {
                let i = this.valueDescriptorNameMap[t]
                this.hasValue(t)
                    ? this.invokeChangedCallback(t, i.writer(this.receiver[t]), n)
                    : this.invokeChangedCallback(t, i.writer(i.defaultValue), n)
            }
            invokeChangedCallbacksForDefaultValues() {
                for (let { key: t, name: e, defaultValue: n, writer: i } of this.valueDescriptors)
                    n != null && !this.controller.data.has(t) && this.invokeChangedCallback(e, i(n), void 0)
            }
            invokeChangedCallback(t, e, n) {
                let i = `${t}Changed`,
                    s = this.receiver[i]
                if (typeof s == "function") {
                    let l = this.valueDescriptorNameMap[t]
                    try {
                        let c = l.reader(e),
                            h = n
                        n && (h = l.reader(n)), s.call(this.receiver, c, h)
                    } catch (c) {
                        throw (
                            (c instanceof TypeError &&
                                (c.message = `Stimulus Value "${this.context.identifier}.${l.name}" - ${c.message}`),
                                c)
                        )
                    }
                }
            }
            get valueDescriptors() {
                let { valueDescriptorMap: t } = this
                return Object.keys(t).map(e => t[e])
            }
            get valueDescriptorNameMap() {
                let t = {}
                return (
                    Object.keys(this.valueDescriptorMap).forEach(e => {
                        let n = this.valueDescriptorMap[e]
                        t[n.name] = n
                    }),
                    t
                )
            }
            hasValue(t) {
                let e = this.valueDescriptorNameMap[t],
                    n = `has${wt(e.name)}`
                return this.receiver[n]
            }
        },
        He = class {
            constructor(t, e) {
                ; (this.context = t), (this.delegate = e), (this.targetsByName = new it())
            }
            start() {
                this.tokenListObserver ||
                    ((this.tokenListObserver = new te(this.element, this.attributeName, this)),
                        this.tokenListObserver.start())
            }
            stop() {
                this.tokenListObserver &&
                    (this.disconnectAllTargets(), this.tokenListObserver.stop(), delete this.tokenListObserver)
            }
            tokenMatched({ element: t, content: e }) {
                this.scope.containsElement(t) && this.connectTarget(t, e)
            }
            tokenUnmatched({ element: t, content: e }) {
                this.disconnectTarget(t, e)
            }
            connectTarget(t, e) {
                var n
                this.targetsByName.has(e, t) ||
                    (this.targetsByName.add(e, t),
                        (n = this.tokenListObserver) === null ||
                        n === void 0 ||
                        n.pause(() => this.delegate.targetConnected(t, e)))
            }
            disconnectTarget(t, e) {
                var n
                this.targetsByName.has(e, t) &&
                    (this.targetsByName.delete(e, t),
                        (n = this.tokenListObserver) === null ||
                        n === void 0 ||
                        n.pause(() => this.delegate.targetDisconnected(t, e)))
            }
            disconnectAllTargets() {
                for (let t of this.targetsByName.keys)
                    for (let e of this.targetsByName.getValuesForKey(t)) this.disconnectTarget(e, t)
            }
            get attributeName() {
                return `data-${this.context.identifier}-target`
            }
            get element() {
                return this.context.element
            }
            get scope() {
                return this.context.scope
            }
        }
    function Wt(o, t) {
        let e = hi(o)
        return Array.from(e.reduce((n, i) => (Go(i, t).forEach(s => n.add(s)), n), new Set()))
    }
    function Do(o, t) {
        return hi(o).reduce((n, i) => (n.push(...Io(i, t)), n), [])
    }
    function hi(o) {
        let t = []
        for (; o;) t.push(o), (o = Object.getPrototypeOf(o))
        return t.reverse()
    }
    function Go(o, t) {
        let e = o[t]
        return Array.isArray(e) ? e : []
    }
    function Io(o, t) {
        let e = o[t]
        return e ? Object.keys(e).map(n => [n, e[n]]) : []
    }
    var je = class {
        constructor(t, e) {
            ; (this.started = false),
                (this.context = t),
                (this.delegate = e),
                (this.outletsByName = new it()),
                (this.outletElementsByName = new it()),
                (this.selectorObserverMap = new Map()),
                (this.attributeObserverMap = new Map())
        }
        start() {
            this.started ||
                (this.outletDefinitions.forEach(t => {
                    this.setupSelectorObserverForOutlet(t), this.setupAttributeObserverForOutlet(t)
                }),
                    (this.started = true),
                    this.dependentContexts.forEach(t => t.refresh()))
        }
        refresh() {
            this.selectorObserverMap.forEach(t => t.refresh()), this.attributeObserverMap.forEach(t => t.refresh())
        }
        stop() {
            this.started &&
                ((this.started = false),
                    this.disconnectAllOutlets(),
                    this.stopSelectorObservers(),
                    this.stopAttributeObservers())
        }
        stopSelectorObservers() {
            this.selectorObserverMap.size > 0 &&
                (this.selectorObserverMap.forEach(t => t.stop()), this.selectorObserverMap.clear())
        }
        stopAttributeObservers() {
            this.attributeObserverMap.size > 0 &&
                (this.attributeObserverMap.forEach(t => t.stop()), this.attributeObserverMap.clear())
        }
        selectorMatched(t, e, { outletName: n }) {
            let i = this.getOutlet(t, n)
            i && this.connectOutlet(i, t, n)
        }
        selectorUnmatched(t, e, { outletName: n }) {
            let i = this.getOutletFromMap(t, n)
            i && this.disconnectOutlet(i, t, n)
        }
        selectorMatchElement(t, { outletName: e }) {
            let n = this.selector(e),
                i = this.hasOutlet(t, e),
                s = t.matches(`[${this.schema.controllerAttribute}~=${e}]`)
            return n ? i && s && t.matches(n) : false
        }
        elementMatchedAttribute(t, e) {
            let n = this.getOutletNameFromOutletAttributeName(e)
            n && this.updateSelectorObserverForOutlet(n)
        }
        elementAttributeValueChanged(t, e) {
            let n = this.getOutletNameFromOutletAttributeName(e)
            n && this.updateSelectorObserverForOutlet(n)
        }
        elementUnmatchedAttribute(t, e) {
            let n = this.getOutletNameFromOutletAttributeName(e)
            n && this.updateSelectorObserverForOutlet(n)
        }
        connectOutlet(t, e, n) {
            var i
            this.outletElementsByName.has(n, e) ||
                (this.outletsByName.add(n, t),
                    this.outletElementsByName.add(n, e),
                    (i = this.selectorObserverMap.get(n)) === null ||
                    i === void 0 ||
                    i.pause(() => this.delegate.outletConnected(t, e, n)))
        }
        disconnectOutlet(t, e, n) {
            var i
            this.outletElementsByName.has(n, e) &&
                (this.outletsByName.delete(n, t),
                    this.outletElementsByName.delete(n, e),
                    (i = this.selectorObserverMap.get(n)) === null ||
                    i === void 0 ||
                    i.pause(() => this.delegate.outletDisconnected(t, e, n)))
        }
        disconnectAllOutlets() {
            for (let t of this.outletElementsByName.keys)
                for (let e of this.outletElementsByName.getValuesForKey(t))
                    for (let n of this.outletsByName.getValuesForKey(t)) this.disconnectOutlet(n, e, t)
        }
        updateSelectorObserverForOutlet(t) {
            let e = this.selectorObserverMap.get(t)
            e && (e.selector = this.selector(t))
        }
        setupSelectorObserverForOutlet(t) {
            let e = this.selector(t),
                n = new Ae(document.body, e, this, { outletName: t })
            this.selectorObserverMap.set(t, n), n.start()
        }
        setupAttributeObserverForOutlet(t) {
            let e = this.attributeNameForOutletName(t),
                n = new qt(this.scope.element, e, this)
            this.attributeObserverMap.set(t, n), n.start()
        }
        selector(t) {
            return this.scope.outlets.getSelectorForOutletName(t)
        }
        attributeNameForOutletName(t) {
            return this.scope.schema.outletAttributeForScope(this.identifier, t)
        }
        getOutletNameFromOutletAttributeName(t) {
            return this.outletDefinitions.find(e => this.attributeNameForOutletName(e) === t)
        }
        get outletDependencies() {
            let t = new it()
            return (
                this.router.modules.forEach(e => {
                    let n = e.definition.controllerConstructor
                    Wt(n, "outlets").forEach(s => t.add(s, e.identifier))
                }),
                t
            )
        }
        get outletDefinitions() {
            return this.outletDependencies.getKeysForValue(this.identifier)
        }
        get dependentControllerIdentifiers() {
            return this.outletDependencies.getValuesForKey(this.identifier)
        }
        get dependentContexts() {
            let t = this.dependentControllerIdentifiers
            return this.router.contexts.filter(e => t.includes(e.identifier))
        }
        hasOutlet(t, e) {
            return !!this.getOutlet(t, e) || !!this.getOutletFromMap(t, e)
        }
        getOutlet(t, e) {
            return this.application.getControllerForElementAndIdentifier(t, e)
        }
        getOutletFromMap(t, e) {
            return this.outletsByName.getValuesForKey(e).find(n => n.element === t)
        }
        get scope() {
            return this.context.scope
        }
        get schema() {
            return this.context.schema
        }
        get identifier() {
            return this.context.identifier
        }
        get application() {
            return this.context.application
        }
        get router() {
            return this.application.router
        }
    },
        Pe = class {
            constructor(t, e) {
                ; (this.logDebugActivity = (n, i = {}) => {
                    let { identifier: s, controller: l, element: c } = this
                        ; (i = Object.assign({ identifier: s, controller: l, element: c }, i)),
                            this.application.logDebugActivity(this.identifier, n, i)
                }),
                    (this.module = t),
                    (this.scope = e),
                    (this.controller = new t.controllerConstructor(this)),
                    (this.bindingObserver = new Je(this, this.dispatcher)),
                    (this.valueObserver = new ze(this, this.controller)),
                    (this.targetObserver = new He(this, this)),
                    (this.outletObserver = new je(this, this))
                try {
                    this.controller.initialize(), this.logDebugActivity("initialize")
                } catch (n) {
                    this.handleError(n, "initializing controller")
                }
            }
            connect() {
                this.bindingObserver.start(),
                    this.valueObserver.start(),
                    this.targetObserver.start(),
                    this.outletObserver.start()
                try {
                    this.controller.connect(), this.logDebugActivity("connect")
                } catch (t) {
                    this.handleError(t, "connecting controller")
                }
            }
            refresh() {
                this.outletObserver.refresh()
            }
            disconnect() {
                try {
                    this.controller.disconnect(), this.logDebugActivity("disconnect")
                } catch (t) {
                    this.handleError(t, "disconnecting controller")
                }
                this.outletObserver.stop(),
                    this.targetObserver.stop(),
                    this.valueObserver.stop(),
                    this.bindingObserver.stop()
            }
            get application() {
                return this.module.application
            }
            get identifier() {
                return this.module.identifier
            }
            get schema() {
                return this.application.schema
            }
            get dispatcher() {
                return this.application.dispatcher
            }
            get element() {
                return this.scope.element
            }
            get parentElement() {
                return this.element.parentElement
            }
            handleError(t, e, n = {}) {
                let { identifier: i, controller: s, element: l } = this
                    ; (n = Object.assign({ identifier: i, controller: s, element: l }, n)),
                        this.application.handleError(t, `Error ${e}`, n)
            }
            targetConnected(t, e) {
                this.invokeControllerMethod(`${e}TargetConnected`, t)
            }
            targetDisconnected(t, e) {
                this.invokeControllerMethod(`${e}TargetDisconnected`, t)
            }
            outletConnected(t, e, n) {
                this.invokeControllerMethod(`${Ie(n)}OutletConnected`, t, e)
            }
            outletDisconnected(t, e, n) {
                this.invokeControllerMethod(`${Ie(n)}OutletDisconnected`, t, e)
            }
            invokeControllerMethod(t, ...e) {
                let n = this.controller
                typeof n[t] == "function" && n[t](...e)
            }
        }
    function _o(o) {
        return No(o, Xo(o))
    }
    function No(o, t) {
        let e = zo(o),
            n = Ao(o.prototype, t)
        return Object.defineProperties(e.prototype, n), e
    }
    function Xo(o) {
        return Wt(o, "blessings").reduce((e, n) => {
            let i = n(o)
            for (let s in i) {
                let l = e[s] || {}
                e[s] = Object.assign(l, i[s])
            }
            return e
        }, {})
    }
    function Ao(o, t) {
        return Jo(t).reduce((e, n) => {
            let i = Yo(o, t, n)
            return i && Object.assign(e, { [n]: i }), e
        }, {})
    }
    function Yo(o, t, e) {
        let n = Object.getOwnPropertyDescriptor(o, e)
        if (!(n && "value" in n)) {
            let s = Object.getOwnPropertyDescriptor(t, e).value
            return n && ((s.get = n.get || s.get), (s.set = n.set || s.set)), s
        }
    }
    var Jo =
        typeof Object.getOwnPropertySymbols == "function"
            ? o => [...Object.getOwnPropertyNames(o), ...Object.getOwnPropertySymbols(o)]
            : Object.getOwnPropertyNames,
        zo = (() => {
            function o(e) {
                function n() {
                    return Reflect.construct(e, arguments, new.target)
                }
                return (
                    (n.prototype = Object.create(e.prototype, {
                        constructor: { value: n },
                    })),
                    Reflect.setPrototypeOf(n, e),
                    n
                )
            }
            function t() {
                let n = o(function () {
                    this.a.call(this)
                })
                return (n.prototype.a = function () { }), new n()
            }
            try {
                return t(), o
            } catch {
                return n => class extends n { }
            }
        })()
    function Ho(o) {
        return {
            identifier: o.identifier,
            controllerConstructor: _o(o.controllerConstructor),
        }
    }
    var Ke = class {
        constructor(t, e) {
            ; (this.application = t),
                (this.definition = Ho(e)),
                (this.contextsByScope = new WeakMap()),
                (this.connectedContexts = new Set())
        }
        get identifier() {
            return this.definition.identifier
        }
        get controllerConstructor() {
            return this.definition.controllerConstructor
        }
        get contexts() {
            return Array.from(this.connectedContexts)
        }
        connectContextForScope(t) {
            let e = this.fetchContextForScope(t)
            this.connectedContexts.add(e), e.connect()
        }
        disconnectContextForScope(t) {
            let e = this.contextsByScope.get(t)
            e && (this.connectedContexts.delete(e), e.disconnect())
        }
        fetchContextForScope(t) {
            let e = this.contextsByScope.get(t)
            return e || ((e = new Pe(this, t)), this.contextsByScope.set(t, e)), e
        }
    },
        $e = class {
            constructor(t) {
                this.scope = t
            }
            has(t) {
                return this.data.has(this.getDataKey(t))
            }
            get(t) {
                return this.getAll(t)[0]
            }
            getAll(t) {
                let e = this.data.get(this.getDataKey(t)) || ""
                return Vo(e)
            }
            getAttributeName(t) {
                return this.data.getAttributeNameForKey(this.getDataKey(t))
            }
            getDataKey(t) {
                return `${t}-class`
            }
            get data() {
                return this.scope.data
            }
        },
        qe = class {
            constructor(t) {
                this.scope = t
            }
            get element() {
                return this.scope.element
            }
            get identifier() {
                return this.scope.identifier
            }
            get(t) {
                let e = this.getAttributeNameForKey(t)
                return this.element.getAttribute(e)
            }
            set(t, e) {
                let n = this.getAttributeNameForKey(t)
                return this.element.setAttribute(n, e), this.get(t)
            }
            has(t) {
                let e = this.getAttributeNameForKey(t)
                return this.element.hasAttribute(e)
            }
            delete(t) {
                if (this.has(t)) {
                    let e = this.getAttributeNameForKey(t)
                    return this.element.removeAttribute(e), true
                } else return false
            }
            getAttributeNameForKey(t) {
                return `data-${this.identifier}-${ci(t)}`
            }
        },
        tn = class {
            constructor(t) {
                ; (this.warnedKeysByObject = new WeakMap()), (this.logger = t)
            }
            warn(t, e, n) {
                let i = this.warnedKeysByObject.get(t)
                i || ((i = new Set()), this.warnedKeysByObject.set(t, i)),
                    i.has(e) || (i.add(e), this.logger.warn(n, t))
            }
        }
    function en(o, t) {
        return `[${o}~="${t}"]`
    }
    var nn = class {
        constructor(t) {
            this.scope = t
        }
        get element() {
            return this.scope.element
        }
        get identifier() {
            return this.scope.identifier
        }
        get schema() {
            return this.scope.schema
        }
        has(t) {
            return this.find(t) != null
        }
        find(...t) {
            return t.reduce((e, n) => e || this.findTarget(n) || this.findLegacyTarget(n), void 0)
        }
        findAll(...t) {
            return t.reduce((e, n) => [...e, ...this.findAllTargets(n), ...this.findAllLegacyTargets(n)], [])
        }
        findTarget(t) {
            let e = this.getSelectorForTargetName(t)
            return this.scope.findElement(e)
        }
        findAllTargets(t) {
            let e = this.getSelectorForTargetName(t)
            return this.scope.findAllElements(e)
        }
        getSelectorForTargetName(t) {
            let e = this.schema.targetAttributeForScope(this.identifier)
            return en(e, t)
        }
        findLegacyTarget(t) {
            let e = this.getLegacySelectorForTargetName(t)
            return this.deprecate(this.scope.findElement(e), t)
        }
        findAllLegacyTargets(t) {
            let e = this.getLegacySelectorForTargetName(t)
            return this.scope.findAllElements(e).map(n => this.deprecate(n, t))
        }
        getLegacySelectorForTargetName(t) {
            let e = `${this.identifier}.${t}`
            return en(this.schema.targetAttribute, e)
        }
        deprecate(t, e) {
            if (t) {
                let { identifier: n } = this,
                    i = this.schema.targetAttribute,
                    s = this.schema.targetAttributeForScope(n)
                this.guide.warn(
                    t,
                    `target:${e}`,
                    `Please replace ${i}="${n}.${e}" with ${s}="${e}". The ${i} attribute is deprecated and will be removed in a future version of Stimulus.`
                )
            }
            return t
        }
        get guide() {
            return this.scope.guide
        }
    },
        on = class {
            constructor(t, e) {
                ; (this.scope = t), (this.controllerElement = e)
            }
            get element() {
                return this.scope.element
            }
            get identifier() {
                return this.scope.identifier
            }
            get schema() {
                return this.scope.schema
            }
            has(t) {
                return this.find(t) != null
            }
            find(...t) {
                return t.reduce((e, n) => e || this.findOutlet(n), void 0)
            }
            findAll(...t) {
                return t.reduce((e, n) => [...e, ...this.findAllOutlets(n)], [])
            }
            getSelectorForOutletName(t) {
                let e = this.schema.outletAttributeForScope(this.identifier, t)
                return this.controllerElement.getAttribute(e)
            }
            findOutlet(t) {
                let e = this.getSelectorForOutletName(t)
                if (e) return this.findElement(e, t)
            }
            findAllOutlets(t) {
                let e = this.getSelectorForOutletName(t)
                return e ? this.findAllElements(e, t) : []
            }
            findElement(t, e) {
                return this.scope.queryElements(t).filter(i => this.matchesElement(i, t, e))[0]
            }
            findAllElements(t, e) {
                return this.scope.queryElements(t).filter(i => this.matchesElement(i, t, e))
            }
            matchesElement(t, e, n) {
                let i = t.getAttribute(this.scope.schema.controllerAttribute) || ""
                return t.matches(e) && i.split(" ").includes(n)
            }
        },
        an = class o {
            constructor(t, e, n, i) {
                ; (this.targets = new nn(this)),
                    (this.classes = new $e(this)),
                    (this.data = new qe(this)),
                    (this.containsElement = s => s.closest(this.controllerSelector) === this.element),
                    (this.schema = t),
                    (this.element = e),
                    (this.identifier = n),
                    (this.guide = new tn(i)),
                    (this.outlets = new on(this.documentScope, e))
            }
            findElement(t) {
                return this.element.matches(t) ? this.element : this.queryElements(t).find(this.containsElement)
            }
            findAllElements(t) {
                return [
                    ...(this.element.matches(t) ? [this.element] : []),
                    ...this.queryElements(t).filter(this.containsElement),
                ]
            }
            queryElements(t) {
                return Array.from(this.element.querySelectorAll(t))
            }
            get controllerSelector() {
                return en(this.schema.controllerAttribute, this.identifier)
            }
            get isDocumentScope() {
                return this.element === document.documentElement
            }
            get documentScope() {
                return this.isDocumentScope
                    ? this
                    : new o(this.schema, document.documentElement, this.identifier, this.guide.logger)
            }
        },
        sn = class {
            constructor(t, e, n) {
                ; (this.element = t),
                    (this.schema = e),
                    (this.delegate = n),
                    (this.valueListObserver = new ee(this.element, this.controllerAttribute, this)),
                    (this.scopesByIdentifierByElement = new WeakMap()),
                    (this.scopeReferenceCounts = new WeakMap())
            }
            start() {
                this.valueListObserver.start()
            }
            stop() {
                this.valueListObserver.stop()
            }
            get controllerAttribute() {
                return this.schema.controllerAttribute
            }
            parseValueForToken(t) {
                let { element: e, content: n } = t
                return this.parseValueForElementAndIdentifier(e, n)
            }
            parseValueForElementAndIdentifier(t, e) {
                let n = this.fetchScopesByIdentifierForElement(t),
                    i = n.get(e)
                return i || ((i = this.delegate.createScopeForElementAndIdentifier(t, e)), n.set(e, i)), i
            }
            elementMatchedValue(t, e) {
                let n = (this.scopeReferenceCounts.get(e) || 0) + 1
                this.scopeReferenceCounts.set(e, n), n == 1 && this.delegate.scopeConnected(e)
            }
            elementUnmatchedValue(t, e) {
                let n = this.scopeReferenceCounts.get(e)
                n && (this.scopeReferenceCounts.set(e, n - 1), n == 1 && this.delegate.scopeDisconnected(e))
            }
            fetchScopesByIdentifierForElement(t) {
                let e = this.scopesByIdentifierByElement.get(t)
                return e || ((e = new Map()), this.scopesByIdentifierByElement.set(t, e)), e
            }
        },
        rn = class {
            constructor(t) {
                ; (this.application = t),
                    (this.scopeObserver = new sn(this.element, this.schema, this)),
                    (this.scopesByIdentifier = new it()),
                    (this.modulesByIdentifier = new Map())
            }
            get element() {
                return this.application.element
            }
            get schema() {
                return this.application.schema
            }
            get logger() {
                return this.application.logger
            }
            get controllerAttribute() {
                return this.schema.controllerAttribute
            }
            get modules() {
                return Array.from(this.modulesByIdentifier.values())
            }
            get contexts() {
                return this.modules.reduce((t, e) => t.concat(e.contexts), [])
            }
            start() {
                this.scopeObserver.start()
            }
            stop() {
                this.scopeObserver.stop()
            }
            loadDefinition(t) {
                this.unloadIdentifier(t.identifier)
                let e = new Ke(this.application, t)
                this.connectModule(e)
                let n = t.controllerConstructor.afterLoad
                n && n.call(t.controllerConstructor, t.identifier, this.application)
            }
            unloadIdentifier(t) {
                let e = this.modulesByIdentifier.get(t)
                e && this.disconnectModule(e)
            }
            getContextForElementAndIdentifier(t, e) {
                let n = this.modulesByIdentifier.get(e)
                if (n) return n.contexts.find(i => i.element == t)
            }
            proposeToConnectScopeForElementAndIdentifier(t, e) {
                let n = this.scopeObserver.parseValueForElementAndIdentifier(t, e)
                n
                    ? this.scopeObserver.elementMatchedValue(n.element, n)
                    : console.error(`Couldn't find or create scope for identifier: "${e}" and element:`, t)
            }
            handleError(t, e, n) {
                this.application.handleError(t, e, n)
            }
            createScopeForElementAndIdentifier(t, e) {
                return new an(this.schema, t, e, this.logger)
            }
            scopeConnected(t) {
                this.scopesByIdentifier.add(t.identifier, t)
                let e = this.modulesByIdentifier.get(t.identifier)
                e && e.connectContextForScope(t)
            }
            scopeDisconnected(t) {
                this.scopesByIdentifier.delete(t.identifier, t)
                let e = this.modulesByIdentifier.get(t.identifier)
                e && e.disconnectContextForScope(t)
            }
            connectModule(t) {
                this.modulesByIdentifier.set(t.identifier, t),
                    this.scopesByIdentifier.getValuesForKey(t.identifier).forEach(n => t.connectContextForScope(n))
            }
            disconnectModule(t) {
                this.modulesByIdentifier.delete(t.identifier),
                    this.scopesByIdentifier.getValuesForKey(t.identifier).forEach(n => t.disconnectContextForScope(n))
            }
        },
        jo = {
            controllerAttribute: "data-controller",
            actionAttribute: "data-action",
            targetAttribute: "data-target",
            targetAttributeForScope: o => `data-${o}-target`,
            outletAttributeForScope: (o, t) => `data-${o}-${t}-outlet`,
            keyMappings: Object.assign(
                Object.assign(
                    {
                        enter: "Enter",
                        tab: "Tab",
                        esc: "Escape",
                        space: " ",
                        up: "ArrowUp",
                        down: "ArrowDown",
                        left: "ArrowLeft",
                        right: "ArrowRight",
                        home: "Home",
                        end: "End",
                        page_up: "PageUp",
                        page_down: "PageDown",
                    },
                    ii("abcdefghijklmnopqrstuvwxyz".split("").map(o => [o, o]))
                ),
                ii("0123456789".split("").map(o => [o, o]))
            ),
        }
    function ii(o) {
        return o.reduce((t, [e, n]) => Object.assign(Object.assign({}, t), { [e]: n }), {})
    }
    var ne = class {
        constructor(t = document.documentElement, e = jo) {
            ; (this.logger = console),
                (this.debug = false),
                (this.logDebugActivity = (n, i, s = {}) => {
                    this.debug && this.logFormattedMessage(n, i, s)
                }),
                (this.element = t),
                (this.schema = e),
                (this.dispatcher = new Ge(this)),
                (this.router = new rn(this)),
                (this.actionDescriptorFilters = Object.assign({}, yo))
        }
        static start(t, e) {
            let n = new this(t, e)
            return n.start(), n
        }
        async start() {
            await Po(),
                this.logDebugActivity("application", "starting"),
                this.dispatcher.start(),
                this.router.start(),
                this.logDebugActivity("application", "start")
        }
        stop() {
            this.logDebugActivity("application", "stopping"),
                this.dispatcher.stop(),
                this.router.stop(),
                this.logDebugActivity("application", "stop")
        }
        register(t, e) {
            this.load({ identifier: t, controllerConstructor: e })
        }
        registerActionOption(t, e) {
            this.actionDescriptorFilters[t] = e
        }
        load(t, ...e) {
            ; (Array.isArray(t) ? t : [t, ...e]).forEach(i => {
                i.controllerConstructor.shouldLoad && this.router.loadDefinition(i)
            })
        }
        unload(t, ...e) {
            ; (Array.isArray(t) ? t : [t, ...e]).forEach(i => this.router.unloadIdentifier(i))
        }
        get controllers() {
            return this.router.contexts.map(t => t.controller)
        }
        getControllerForElementAndIdentifier(t, e) {
            let n = this.router.getContextForElementAndIdentifier(t, e)
            return n ? n.controller : null
        }
        handleError(t, e, n) {
            var i
            this.logger.error(
                `%s

%o

%o`,
                e,
                t,
                n
            ),
                (i = window.onerror) === null || i === void 0 || i.call(window, e, "", 0, 0, t)
        }
        logFormattedMessage(t, e, n = {}) {
            ; (n = Object.assign({ application: this }, n)),
                this.logger.groupCollapsed(`${t} #${e}`),
                this.logger.log("details:", Object.assign({}, n)),
                this.logger.groupEnd()
        }
    }
    function Po() {
        return new Promise(o => {
            document.readyState == "loading" ? document.addEventListener("DOMContentLoaded", () => o()) : o()
        })
    }
    function Ko(o) {
        return Wt(o, "classes").reduce((e, n) => Object.assign(e, $o(n)), {})
    }
    function $o(o) {
        return {
            [`${o}Class`]: {
                get() {
                    let { classes: t } = this
                    if (t.has(o)) return t.get(o)
                    {
                        let e = t.getAttributeName(o)
                        throw new Error(`Missing attribute "${e}"`)
                    }
                },
            },
            [`${o}Classes`]: {
                get() {
                    return this.classes.getAll(o)
                },
            },
            [`has${wt(o)}Class`]: {
                get() {
                    return this.classes.has(o)
                },
            },
        }
    }
    function qo(o) {
        return Wt(o, "outlets").reduce((e, n) => Object.assign(e, ta(n)), {})
    }
    function oi(o, t, e) {
        return o.application.getControllerForElementAndIdentifier(t, e)
    }
    function ai(o, t, e) {
        let n = oi(o, t, e)
        if (n || (o.application.router.proposeToConnectScopeForElementAndIdentifier(t, e), (n = oi(o, t, e)), n))
            return n
    }
    function ta(o) {
        let t = Ie(o)
        return {
            [`${t}Outlet`]: {
                get() {
                    let e = this.outlets.find(o),
                        n = this.outlets.getSelectorForOutletName(o)
                    if (e) {
                        let i = ai(this, e, o)
                        if (i) return i
                        throw new Error(
                            `The provided outlet element is missing an outlet controller "${o}" instance for host controller "${this.identifier}"`
                        )
                    }
                    throw new Error(
                        `Missing outlet element "${o}" for host controller "${this.identifier}". Stimulus couldn't find a matching outlet element using selector "${n}".`
                    )
                },
            },
            [`${t}Outlets`]: {
                get() {
                    let e = this.outlets.findAll(o)
                    return e.length > 0
                        ? e
                            .map(n => {
                                let i = ai(this, n, o)
                                if (i) return i
                                console.warn(
                                    `The provided outlet element is missing an outlet controller "${o}" instance for host controller "${this.identifier}"`,
                                    n
                                )
                            })
                            .filter(n => n)
                        : []
                },
            },
            [`${t}OutletElement`]: {
                get() {
                    let e = this.outlets.find(o),
                        n = this.outlets.getSelectorForOutletName(o)
                    if (e) return e
                    throw new Error(
                        `Missing outlet element "${o}" for host controller "${this.identifier}". Stimulus couldn't find a matching outlet element using selector "${n}".`
                    )
                },
            },
            [`${t}OutletElements`]: {
                get() {
                    return this.outlets.findAll(o)
                },
            },
            [`has${wt(t)}Outlet`]: {
                get() {
                    return this.outlets.has(o)
                },
            },
        }
    }
    function ea(o) {
        return Wt(o, "targets").reduce((e, n) => Object.assign(e, na(n)), {})
    }
    function na(o) {
        return {
            [`${o}Target`]: {
                get() {
                    let t = this.targets.find(o)
                    if (t) return t
                    throw new Error(`Missing target element "${o}" for "${this.identifier}" controller`)
                },
            },
            [`${o}Targets`]: {
                get() {
                    return this.targets.findAll(o)
                },
            },
            [`has${wt(o)}Target`]: {
                get() {
                    return this.targets.has(o)
                },
            },
        }
    }
    function ia(o) {
        let t = Do(o, "values"),
            e = {
                valueDescriptorMap: {
                    get() {
                        return t.reduce((n, i) => {
                            let s = ui(i, this.identifier),
                                l = this.data.getAttributeNameForKey(s.key)
                            return Object.assign(n, { [l]: s })
                        }, {})
                    },
                },
            }
        return t.reduce((n, i) => Object.assign(n, oa(i)), e)
    }
    function oa(o, t) {
        let e = ui(o, t),
            { key: n, name: i, reader: s, writer: l } = e
        return {
            [i]: {
                get() {
                    let c = this.data.get(n)
                    return c !== null ? s(c) : e.defaultValue
                },
                set(c) {
                    c === void 0 ? this.data.delete(n) : this.data.set(n, l(c))
                },
            },
            [`has${wt(i)}`]: {
                get() {
                    return this.data.has(n) || e.hasCustomDefaultValue
                },
            },
        }
    }
    function ui([o, t], e) {
        return la({ controller: e, token: o, typeDefinition: t })
    }
    function ie(o) {
        switch (o) {
            case Array:
                return "array"
            case Boolean:
                return "boolean"
            case Number:
                return "number"
            case Object:
                return "object"
            case String:
                return "string"
        }
    }
    function xt(o) {
        switch (typeof o) {
            case "boolean":
                return "boolean"
            case "number":
                return "number"
            case "string":
                return "string"
        }
        if (Array.isArray(o)) return "array"
        if (Object.prototype.toString.call(o) === "[object Object]") return "object"
    }
    function aa(o) {
        let { controller: t, token: e, typeObject: n } = o,
            i = ti(n.type),
            s = ti(n.default),
            l = i && s,
            c = i && !s,
            h = !i && s,
            m = ie(n.type),
            a = xt(o.typeObject.default)
        if (c) return m
        if (h) return a
        if (m !== a) {
            let r = t ? `${t}.${e}` : e
            throw new Error(
                `The specified default value for the Stimulus Value "${r}" must match the defined type "${m}". The provided default value of "${n.default}" is of type "${a}".`
            )
        }
        if (l) return m
    }
    function sa(o) {
        let { controller: t, token: e, typeDefinition: n } = o,
            s = aa({ controller: t, token: e, typeObject: n }),
            l = xt(n),
            c = ie(n),
            h = s || l || c
        if (h) return h
        let m = t ? `${t}.${n}` : e
        throw new Error(`Unknown value type "${m}" for "${e}" value`)
    }
    function ra(o) {
        let t = ie(o)
        if (t) return si[t]
        let e = _e(o, "default"),
            n = _e(o, "type"),
            i = o
        if (e) return i.default
        if (n) {
            let { type: s } = i,
                l = ie(s)
            if (l) return si[l]
        }
        return o
    }
    function la(o) {
        let { token: t, typeDefinition: e } = o,
            n = `${ci(t)}-value`,
            i = sa(o)
        return {
            type: i,
            key: n,
            name: ln(n),
            get defaultValue() {
                return ra(e)
            },
            get hasCustomDefaultValue() {
                return xt(e) !== void 0
            },
            reader: ca[i],
            writer: ri[i] || ri.default,
        }
    }
    var si = {
        get array() {
            return []
        },
        boolean: false,
        number: 0,
        get object() {
            return {}
        },
        string: "",
    },
        ca = {
            array(o) {
                let t = JSON.parse(o)
                if (!Array.isArray(t))
                    throw new TypeError(
                        `expected value of type "array" but instead got value "${o}" of type "${xt(t)}"`
                    )
                return t
            },
            boolean(o) {
                return !(o == "0" || String(o).toLowerCase() == "false")
            },
            number(o) {
                return Number(o.replace(/_/g, ""))
            },
            object(o) {
                let t = JSON.parse(o)
                if (t === null || typeof t != "object" || Array.isArray(t))
                    throw new TypeError(
                        `expected value of type "object" but instead got value "${o}" of type "${xt(t)}"`
                    )
                return t
            },
            string(o) {
                return o
            },
        },
        ri = { default: da, array: li, object: li }
    function li(o) {
        return JSON.stringify(o)
    }
    function da(o) {
        return `${o}`
    }
    var V = class {
        constructor(t) {
            this.context = t
        }
        static get shouldLoad() {
            return true
        }
        static afterLoad(t, e) { }
        get application() {
            return this.context.application
        }
        get scope() {
            return this.context.scope
        }
        get element() {
            return this.scope.element
        }
        get identifier() {
            return this.scope.identifier
        }
        get targets() {
            return this.scope.targets
        }
        get outlets() {
            return this.scope.outlets
        }
        get classes() {
            return this.scope.classes
        }
        get data() {
            return this.scope.data
        }
        initialize() { }
        connect() { }
        disconnect() { }
        dispatch(
            t,
            {
                target: e = this.element,
                detail: n = {},
                prefix: i = this.identifier,
                bubbles: s = true,
                cancelable: l = true,
            } = {}
        ) {
            let c = i ? `${i}:${t}` : t,
                h = new CustomEvent(c, { detail: n, bubbles: s, cancelable: l })
            return e.dispatchEvent(h), h
        }
    }
    V.blessings = [Ko, ea, ia, qo]
    V.targets = []
    V.outlets = []
    V.values = {}
    var F = (o, t = 1e4) => ((o = parseFloat(o + "") || 0), Math.round((o + Number.EPSILON) * t) / t),
        xn = function (o) {
            if (!(o && o instanceof Element && o.offsetParent)) return false
            let t = o.scrollHeight > o.clientHeight,
                e = window.getComputedStyle(o).overflowY,
                n = e.indexOf("hidden") !== -1,
                i = e.indexOf("visible") !== -1
            return t && !n && !i
        },
        Qe = function (o, t = void 0) {
            return !(!o || o === document.body || (t && o === t)) && (xn(o) ? o : Qe(o.parentElement, t))
        },
        tt = function (o) {
            var t = new DOMParser().parseFromString(o, "text/html").body
            if (t.childElementCount > 1) {
                for (var e = document.createElement("div"); t.firstChild;) e.appendChild(t.firstChild)
                return e
            }
            return t.firstChild
        },
        Vn = o => `${o || ""}`.split(" ").filter(t => !!t),
        et = (o, t, e) => {
            o &&
                Vn(t).forEach(n => {
                    o.classList.toggle(n, e || false)
                })
        },
        dt = class {
            constructor(t) {
                Object.defineProperty(this, "pageX", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: void 0,
                }),
                    Object.defineProperty(this, "pageY", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: void 0,
                    }),
                    Object.defineProperty(this, "clientX", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: void 0,
                    }),
                    Object.defineProperty(this, "clientY", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: void 0,
                    }),
                    Object.defineProperty(this, "id", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: void 0,
                    }),
                    Object.defineProperty(this, "time", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: void 0,
                    }),
                    Object.defineProperty(this, "nativePointer", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: void 0,
                    }),
                    (this.nativePointer = t),
                    (this.pageX = t.pageX),
                    (this.pageY = t.pageY),
                    (this.clientX = t.clientX),
                    (this.clientY = t.clientY),
                    (this.id = self.Touch && t instanceof Touch ? t.identifier : -1),
                    (this.time = Date.now())
            }
        },
        bt = { passive: false },
        wn = class {
            constructor(t, { start: e = () => true, move: n = () => { }, end: i = () => { } }) {
                Object.defineProperty(this, "element", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: void 0,
                }),
                    Object.defineProperty(this, "startCallback", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: void 0,
                    }),
                    Object.defineProperty(this, "moveCallback", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: void 0,
                    }),
                    Object.defineProperty(this, "endCallback", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: void 0,
                    }),
                    Object.defineProperty(this, "currentPointers", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: [],
                    }),
                    Object.defineProperty(this, "startPointers", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: [],
                    }),
                    (this.element = t),
                    (this.startCallback = e),
                    (this.moveCallback = n),
                    (this.endCallback = i)
                for (let s of [
                    "onPointerStart",
                    "onTouchStart",
                    "onMove",
                    "onTouchEnd",
                    "onPointerEnd",
                    "onWindowBlur",
                ])
                    this[s] = this[s].bind(this)
                this.element.addEventListener("mousedown", this.onPointerStart, bt),
                    this.element.addEventListener("touchstart", this.onTouchStart, bt),
                    this.element.addEventListener("touchmove", this.onMove, bt),
                    this.element.addEventListener("touchend", this.onTouchEnd),
                    this.element.addEventListener("touchcancel", this.onTouchEnd)
            }
            onPointerStart(t) {
                if (!t.buttons || t.button !== 0) return
                let e = new dt(t)
                this.currentPointers.some(n => n.id === e.id) ||
                    (this.triggerPointerStart(e, t) &&
                        (window.addEventListener("mousemove", this.onMove),
                            window.addEventListener("mouseup", this.onPointerEnd),
                            window.addEventListener("blur", this.onWindowBlur)))
            }
            onTouchStart(t) {
                for (let e of Array.from(t.changedTouches || [])) this.triggerPointerStart(new dt(e), t)
                window.addEventListener("blur", this.onWindowBlur)
            }
            onMove(t) {
                let e = this.currentPointers.slice(),
                    n = "changedTouches" in t ? Array.from(t.changedTouches || []).map(s => new dt(s)) : [new dt(t)],
                    i = []
                for (let s of n) {
                    let l = this.currentPointers.findIndex(c => c.id === s.id)
                    l < 0 || (i.push(s), (this.currentPointers[l] = s))
                }
                i.length && this.moveCallback(t, this.currentPointers.slice(), e)
            }
            onPointerEnd(t) {
                ; (t.buttons > 0 && t.button !== 0) ||
                    (this.triggerPointerEnd(t, new dt(t)),
                        window.removeEventListener("mousemove", this.onMove),
                        window.removeEventListener("mouseup", this.onPointerEnd),
                        window.removeEventListener("blur", this.onWindowBlur))
            }
            onTouchEnd(t) {
                for (let e of Array.from(t.changedTouches || [])) this.triggerPointerEnd(t, new dt(e))
            }
            triggerPointerStart(t, e) {
                return (
                    !!this.startCallback(e, t, this.currentPointers.slice()) &&
                    (this.currentPointers.push(t), this.startPointers.push(t), true)
                )
            }
            triggerPointerEnd(t, e) {
                let n = this.currentPointers.findIndex(i => i.id === e.id)
                n < 0 ||
                    (this.currentPointers.splice(n, 1),
                        this.startPointers.splice(n, 1),
                        this.endCallback(t, e, this.currentPointers.slice()))
            }
            onWindowBlur() {
                this.clear()
            }
            clear() {
                for (; this.currentPointers.length;) {
                    let t = this.currentPointers[this.currentPointers.length - 1]
                    this.currentPointers.splice(this.currentPointers.length - 1, 1),
                        this.startPointers.splice(this.currentPointers.length - 1, 1),
                        this.endCallback(
                            new Event("touchend", {
                                bubbles: true,
                                cancelable: true,
                                clientX: t.clientX,
                                clientY: t.clientY,
                            }),
                            t,
                            this.currentPointers.slice()
                        )
                }
            }
            stop() {
                this.element.removeEventListener("mousedown", this.onPointerStart, bt),
                    this.element.removeEventListener("touchstart", this.onTouchStart, bt),
                    this.element.removeEventListener("touchmove", this.onMove, bt),
                    this.element.removeEventListener("touchend", this.onTouchEnd),
                    this.element.removeEventListener("touchcancel", this.onTouchEnd),
                    window.removeEventListener("mousemove", this.onMove),
                    window.removeEventListener("mouseup", this.onPointerEnd),
                    window.removeEventListener("blur", this.onWindowBlur)
            }
        }
    function mi(o, t) {
        return t ? Math.sqrt(Math.pow(t.clientX - o.clientX, 2) + Math.pow(t.clientY - o.clientY, 2)) : 0
    }
    function pi(o, t) {
        return t
            ? {
                clientX: (o.clientX + t.clientX) / 2,
                clientY: (o.clientY + t.clientY) / 2,
            }
            : o
    }
    var Wn = o =>
        typeof o == "object" &&
        o !== null &&
        o.constructor === Object &&
        Object.prototype.toString.call(o) === "[object Object]",
        X = (o, ...t) => {
            let e = t.length
            for (let n = 0; n < e; n++) {
                let i = t[n] || {}
                Object.entries(i).forEach(([s, l]) => {
                    let c = Array.isArray(l) ? [] : {}
                    o[s] || Object.assign(o, { [s]: c }),
                        Wn(l)
                            ? Object.assign(o[s], X(c, l))
                            : Array.isArray(l)
                                ? Object.assign(o, { [s]: [...l] })
                                : Object.assign(o, { [s]: l })
                })
            }
            return o
        },
        cn = function (o, t) {
            return o.split(".").reduce((e, n) => (typeof e == "object" ? e[n] : void 0), t)
        },
        yt = class {
            constructor(t = {}) {
                Object.defineProperty(this, "options", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: t,
                }),
                    Object.defineProperty(this, "events", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: new Map(),
                    }),
                    this.setOptions(t)
                for (let e of Object.getOwnPropertyNames(Object.getPrototypeOf(this)))
                    e.startsWith("on") && typeof this[e] == "function" && (this[e] = this[e].bind(this))
            }
            setOptions(t) {
                this.options = t ? X({}, this.constructor.defaults, t) : {}
                for (let [e, n] of Object.entries(this.option("on") || {})) this.on(e, n)
            }
            option(t, ...e) {
                let n = cn(t, this.options)
                return n && typeof n == "function" && (n = n.call(this, this, ...e)), n
            }
            optionFor(t, e, n, ...i) {
                let s = cn(e, t)
                var l
                typeof (l = s) != "string" || isNaN(l) || isNaN(parseFloat(l)) || (s = parseFloat(s)),
                    s === "true" && (s = true),
                    s === "false" && (s = false),
                    s && typeof s == "function" && (s = s.call(this, this, t, ...i))
                let c = cn(e, this.options)
                return (
                    c && typeof c == "function" ? (s = c.call(this, this, t, ...i, s)) : s === void 0 && (s = c),
                    s === void 0 ? n : s
                )
            }
            cn(t) {
                let e = this.options.classes
                return (e && e[t]) || ""
            }
            localize(t, e = []) {
                t = String(t).replace(/\{\{(\w+).?(\w+)?\}\}/g, (n, i, s) => {
                    let l = ""
                    return (
                        s
                            ? (l = this.option(`${i[0] + i.toLowerCase().substring(1)}.l10n.${s}`))
                            : i && (l = this.option(`l10n.${i}`)),
                        l || (l = n),
                        l
                    )
                })
                for (let n = 0; n < e.length; n++) t = t.split(e[n][0]).join(e[n][1])
                return (t = t.replace(/\{\{(.*?)\}\}/g, (n, i) => i))
            }
            on(t, e) {
                let n = []
                typeof t == "string" ? (n = t.split(" ")) : Array.isArray(t) && (n = t),
                    this.events || (this.events = new Map()),
                    n.forEach(i => {
                        let s = this.events.get(i)
                        s || (this.events.set(i, []), (s = [])), s.includes(e) || s.push(e), this.events.set(i, s)
                    })
            }
            off(t, e) {
                let n = []
                typeof t == "string" ? (n = t.split(" ")) : Array.isArray(t) && (n = t),
                    n.forEach(i => {
                        let s = this.events.get(i)
                        if (Array.isArray(s)) {
                            let l = s.indexOf(e)
                            l > -1 && s.splice(l, 1)
                        }
                    })
            }
            emit(t, ...e) {
                ;[...(this.events.get(t) || [])].forEach(n => n(this, ...e)), t !== "*" && this.emit("*", t, ...e)
            }
        }
    Object.defineProperty(yt, "version", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "5.0.36",
    }),
        Object.defineProperty(yt, "defaults", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {},
        })
    var Ot = class extends yt {
        constructor(t = {}) {
            super(t),
                Object.defineProperty(this, "plugins", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: {},
                })
        }
        attachPlugins(t = {}) {
            let e = new Map()
            for (let [n, i] of Object.entries(t)) {
                let s = this.option(n),
                    l = this.plugins[n]
                l || s === false
                    ? l && s === false && (l.detach(), delete this.plugins[n])
                    : e.set(n, new i(this, s || {}))
            }
            for (let [n, i] of e) (this.plugins[n] = i), i.attach()
        }
        detachPlugins(t) {
            t = t || Object.keys(this.plugins)
            for (let e of t) {
                let n = this.plugins[e]
                n && n.detach(), delete this.plugins[e]
            }
            return this.emit("detachPlugins"), this
        }
    },
        O
        ; (function (o) {
            ; (o[(o.Init = 0)] = "Init"),
                (o[(o.Error = 1)] = "Error"),
                (o[(o.Ready = 2)] = "Ready"),
                (o[(o.Panning = 3)] = "Panning"),
                (o[(o.Mousemove = 4)] = "Mousemove"),
                (o[(o.Destroy = 5)] = "Destroy")
        })(O || (O = {}))
    var ot = ["a", "b", "c", "d", "e", "f"],
        Ni = {
            PANUP: "Move up",
            PANDOWN: "Move down",
            PANLEFT: "Move left",
            PANRIGHT: "Move right",
            ZOOMIN: "Zoom in",
            ZOOMOUT: "Zoom out",
            TOGGLEZOOM: "Toggle zoom level",
            TOGGLE1TO1: "Toggle zoom level",
            ITERATEZOOM: "Toggle zoom level",
            ROTATECCW: "Rotate counterclockwise",
            ROTATECW: "Rotate clockwise",
            FLIPX: "Flip horizontally",
            FLIPY: "Flip vertically",
            FITX: "Fit horizontally",
            FITY: "Fit vertically",
            RESET: "Reset",
            TOGGLEFS: "Toggle fullscreen",
        },
        ha = {
            content: null,
            width: "auto",
            height: "auto",
            panMode: "drag",
            touch: true,
            dragMinThreshold: 3,
            lockAxis: false,
            mouseMoveFactor: 1,
            mouseMoveFriction: 0.12,
            zoom: true,
            pinchToZoom: true,
            panOnlyZoomed: "auto",
            minScale: 1,
            maxScale: 2,
            friction: 0.25,
            dragFriction: 0.35,
            decelFriction: 0.05,
            click: "toggleZoom",
            dblClick: false,
            wheel: "zoom",
            wheelLimit: 7,
            spinner: true,
            bounds: "auto",
            infinite: false,
            rubberband: true,
            bounce: true,
            maxVelocity: 75,
            transformParent: false,
            classes: {
                content: "f-panzoom__content",
                isLoading: "is-loading",
                canZoomIn: "can-zoom_in",
                canZoomOut: "can-zoom_out",
                isDraggable: "is-draggable",
                isDragging: "is-dragging",
                inFullscreen: "in-fullscreen",
                htmlHasFullscreen: "with-panzoom-in-fullscreen",
            },
            l10n: Ni,
        },
        fi = '<circle cx="25" cy="25" r="20"></circle>',
        Rn = '<div class="f-spinner"><svg viewBox="0 0 50 50">' + fi + fi + "</svg></div>",
        N = o => o && o !== null && o instanceof Element && "nodeType" in o,
        Z = (o, t) => {
            o &&
                Vn(t).forEach(e => {
                    o.classList.remove(e)
                })
        },
        v = (o, t) => {
            o &&
                Vn(t).forEach(e => {
                    o.classList.add(e)
                })
        },
        oe = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 },
        ua = 1e5,
        ae = 1e4,
        z = "mousemove",
        Qi = "drag",
        bi = "content",
        H = "auto",
        dn = null,
        hn = null,
        Qt = class o extends Ot {
            get fits() {
                return (
                    this.contentRect.width - this.contentRect.fitWidth < 1 &&
                    this.contentRect.height - this.contentRect.fitHeight < 1
                )
            }
            get isTouchDevice() {
                return hn === null && (hn = window.matchMedia("(hover: none)").matches), hn
            }
            get isMobile() {
                return dn === null && (dn = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)), dn
            }
            get panMode() {
                return this.options.panMode !== z || this.isTouchDevice ? Qi : z
            }
            get panOnlyZoomed() {
                let t = this.options.panOnlyZoomed
                return t === H ? this.isTouchDevice : t
            }
            get isInfinite() {
                return this.option("infinite")
            }
            get angle() {
                return (180 * Math.atan2(this.current.b, this.current.a)) / Math.PI || 0
            }
            get targetAngle() {
                return (180 * Math.atan2(this.target.b, this.target.a)) / Math.PI || 0
            }
            get scale() {
                let { a: t, b: e } = this.current
                return Math.sqrt(t * t + e * e) || 1
            }
            get targetScale() {
                let { a: t, b: e } = this.target
                return Math.sqrt(t * t + e * e) || 1
            }
            get minScale() {
                return this.option("minScale") || 1
            }
            get fullScale() {
                let { contentRect: t } = this
                return t.fullWidth / t.fitWidth || 1
            }
            get maxScale() {
                return this.fullScale * (this.option("maxScale") || 1) || 1
            }
            get coverScale() {
                let { containerRect: t, contentRect: e } = this,
                    n = Math.max(t.height / e.fitHeight, t.width / e.fitWidth) || 1
                return Math.min(this.fullScale, n)
            }
            get isScaling() {
                return Math.abs(this.targetScale - this.scale) > 1e-5 && !this.isResting
            }
            get isContentLoading() {
                let t = this.content
                return !!(t && t instanceof HTMLImageElement) && !t.complete
            }
            get isResting() {
                if (this.isBouncingX || this.isBouncingY) return false
                for (let t of ot) {
                    let e = t == "e" || t === "f" ? 1e-4 : 1e-5
                    if (Math.abs(this.target[t] - this.current[t]) > e) return false
                }
                return !(!this.ignoreBounds && !this.checkBounds().inBounds)
            }
            constructor(t, e = {}, n = {}) {
                var i
                if (
                    (super(e),
                        Object.defineProperty(this, "pointerTracker", {
                            enumerable: true,
                            configurable: true,
                            writable: true,
                            value: null,
                        }),
                        Object.defineProperty(this, "resizeObserver", {
                            enumerable: true,
                            configurable: true,
                            writable: true,
                            value: null,
                        }),
                        Object.defineProperty(this, "updateTimer", {
                            enumerable: true,
                            configurable: true,
                            writable: true,
                            value: null,
                        }),
                        Object.defineProperty(this, "clickTimer", {
                            enumerable: true,
                            configurable: true,
                            writable: true,
                            value: null,
                        }),
                        Object.defineProperty(this, "rAF", {
                            enumerable: true,
                            configurable: true,
                            writable: true,
                            value: null,
                        }),
                        Object.defineProperty(this, "isTicking", {
                            enumerable: true,
                            configurable: true,
                            writable: true,
                            value: false,
                        }),
                        Object.defineProperty(this, "ignoreBounds", {
                            enumerable: true,
                            configurable: true,
                            writable: true,
                            value: false,
                        }),
                        Object.defineProperty(this, "isBouncingX", {
                            enumerable: true,
                            configurable: true,
                            writable: true,
                            value: false,
                        }),
                        Object.defineProperty(this, "isBouncingY", {
                            enumerable: true,
                            configurable: true,
                            writable: true,
                            value: false,
                        }),
                        Object.defineProperty(this, "clicks", {
                            enumerable: true,
                            configurable: true,
                            writable: true,
                            value: 0,
                        }),
                        Object.defineProperty(this, "trackingPoints", {
                            enumerable: true,
                            configurable: true,
                            writable: true,
                            value: [],
                        }),
                        Object.defineProperty(this, "pwt", {
                            enumerable: true,
                            configurable: true,
                            writable: true,
                            value: 0,
                        }),
                        Object.defineProperty(this, "cwd", {
                            enumerable: true,
                            configurable: true,
                            writable: true,
                            value: 0,
                        }),
                        Object.defineProperty(this, "pmme", {
                            enumerable: true,
                            configurable: true,
                            writable: true,
                            value: void 0,
                        }),
                        Object.defineProperty(this, "friction", {
                            enumerable: true,
                            configurable: true,
                            writable: true,
                            value: 0,
                        }),
                        Object.defineProperty(this, "state", {
                            enumerable: true,
                            configurable: true,
                            writable: true,
                            value: O.Init,
                        }),
                        Object.defineProperty(this, "isDragging", {
                            enumerable: true,
                            configurable: true,
                            writable: true,
                            value: false,
                        }),
                        Object.defineProperty(this, "container", {
                            enumerable: true,
                            configurable: true,
                            writable: true,
                            value: void 0,
                        }),
                        Object.defineProperty(this, "content", {
                            enumerable: true,
                            configurable: true,
                            writable: true,
                            value: void 0,
                        }),
                        Object.defineProperty(this, "spinner", {
                            enumerable: true,
                            configurable: true,
                            writable: true,
                            value: null,
                        }),
                        Object.defineProperty(this, "containerRect", {
                            enumerable: true,
                            configurable: true,
                            writable: true,
                            value: { width: 0, height: 0, innerWidth: 0, innerHeight: 0 },
                        }),
                        Object.defineProperty(this, "contentRect", {
                            enumerable: true,
                            configurable: true,
                            writable: true,
                            value: {
                                top: 0,
                                right: 0,
                                bottom: 0,
                                left: 0,
                                fullWidth: 0,
                                fullHeight: 0,
                                fitWidth: 0,
                                fitHeight: 0,
                                width: 0,
                                height: 0,
                            },
                        }),
                        Object.defineProperty(this, "dragStart", {
                            enumerable: true,
                            configurable: true,
                            writable: true,
                            value: { x: 0, y: 0, top: 0, left: 0, time: 0 },
                        }),
                        Object.defineProperty(this, "dragOffset", {
                            enumerable: true,
                            configurable: true,
                            writable: true,
                            value: { x: 0, y: 0, time: 0 },
                        }),
                        Object.defineProperty(this, "current", {
                            enumerable: true,
                            configurable: true,
                            writable: true,
                            value: Object.assign({}, oe),
                        }),
                        Object.defineProperty(this, "target", {
                            enumerable: true,
                            configurable: true,
                            writable: true,
                            value: Object.assign({}, oe),
                        }),
                        Object.defineProperty(this, "velocity", {
                            enumerable: true,
                            configurable: true,
                            writable: true,
                            value: { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0 },
                        }),
                        Object.defineProperty(this, "lockedAxis", {
                            enumerable: true,
                            configurable: true,
                            writable: true,
                            value: false,
                        }),
                        !t)
                )
                    throw new Error("Container Element Not Found")
                    ; (this.container = t),
                        this.initContent(),
                        this.attachPlugins(Object.assign(Object.assign({}, o.Plugins), n)),
                        this.emit("attachPlugins"),
                        this.emit("init")
                let s = this.content
                if (
                    (s.addEventListener("load", this.onLoad),
                        s.addEventListener("error", this.onError),
                        this.isContentLoading)
                ) {
                    if (this.option("spinner")) {
                        t.classList.add(this.cn("isLoading"))
                        let l = tt(Rn)
                        !t.contains(s) || s.parentElement instanceof HTMLPictureElement
                            ? (this.spinner = t.appendChild(l))
                            : (this.spinner =
                                ((i = s.parentElement) === null || i === void 0 ? void 0 : i.insertBefore(l, s)) ||
                                null)
                    }
                    this.emit("beforeLoad")
                } else
                    queueMicrotask(() => {
                        this.enable()
                    })
            }
            initContent() {
                let { container: t } = this,
                    e = this.cn(bi),
                    n = this.option(bi) || t.querySelector(`.${e}`)
                if (
                    (n || ((n = t.querySelector("img,picture") || t.firstElementChild), n && v(n, e)),
                        n instanceof HTMLPictureElement && (n = n.querySelector("img")),
                        !n)
                )
                    throw new Error("No content found")
                this.content = n
            }
            onLoad() {
                let { spinner: t, container: e, state: n } = this
                t && (t.remove(), (this.spinner = null)),
                    this.option("spinner") && e.classList.remove(this.cn("isLoading")),
                    this.emit("afterLoad"),
                    n === O.Init ? this.enable() : this.updateMetrics()
            }
            onError() {
                this.state !== O.Destroy &&
                    (this.spinner && (this.spinner.remove(), (this.spinner = null)),
                        this.stop(),
                        this.detachEvents(),
                        (this.state = O.Error),
                        this.emit("error"))
            }
            getNextScale(t) {
                let { fullScale: e, targetScale: n, coverScale: i, maxScale: s, minScale: l } = this,
                    c = l
                switch (t) {
                    case "toggleMax":
                        c = n - l < 0.5 * (s - l) ? s : l
                        break
                    case "toggleCover":
                        c = n - l < 0.5 * (i - l) ? i : l
                        break
                    case "toggleZoom":
                        c = n - l < 0.5 * (e - l) ? e : l
                        break
                    case "iterateZoom":
                        let h = [1, e, s].sort((a, r) => a - r),
                            m = h.findIndex(a => a > n + 1e-5)
                        c = h[m] || 1
                }
                return c
            }
            attachObserver() {
                var t
                let e = () => {
                    let { container: n, containerRect: i } = this
                    return (
                        Math.abs(i.width - n.getBoundingClientRect().width) > 0.1 ||
                        Math.abs(i.height - n.getBoundingClientRect().height) > 0.1
                    )
                }
                this.resizeObserver ||
                    window.ResizeObserver === void 0 ||
                    (this.resizeObserver = new ResizeObserver(() => {
                        this.updateTimer ||
                            (e()
                                ? (this.onResize(),
                                    this.isMobile &&
                                    (this.updateTimer = setTimeout(() => {
                                        e() && this.onResize(), (this.updateTimer = null)
                                    }, 500)))
                                : this.updateTimer && (clearTimeout(this.updateTimer), (this.updateTimer = null)))
                    })),
                    (t = this.resizeObserver) === null || t === void 0 || t.observe(this.container)
            }
            detachObserver() {
                var t
                    ; (t = this.resizeObserver) === null || t === void 0 || t.disconnect()
            }
            attachEvents() {
                let { container: t } = this
                t.addEventListener("click", this.onClick, { passive: false, capture: false }),
                    t.addEventListener("wheel", this.onWheel, { passive: false }),
                    (this.pointerTracker = new wn(t, {
                        start: this.onPointerDown,
                        move: this.onPointerMove,
                        end: this.onPointerUp,
                    })),
                    document.addEventListener(z, this.onMouseMove)
            }
            detachEvents() {
                var t
                let { container: e } = this
                e.removeEventListener("click", this.onClick, {
                    passive: false,
                    capture: false,
                }),
                    e.removeEventListener("wheel", this.onWheel, { passive: false }),
                    (t = this.pointerTracker) === null || t === void 0 || t.stop(),
                    (this.pointerTracker = null),
                    document.removeEventListener(z, this.onMouseMove),
                    document.removeEventListener("keydown", this.onKeydown, true),
                    this.clickTimer && (clearTimeout(this.clickTimer), (this.clickTimer = null)),
                    this.updateTimer && (clearTimeout(this.updateTimer), (this.updateTimer = null))
            }
            animate() {
                this.setTargetForce()
                let t = this.friction,
                    e = this.option("maxVelocity")
                for (let n of ot)
                    t
                        ? ((this.velocity[n] *= 1 - t),
                            e && !this.isScaling && (this.velocity[n] = Math.max(Math.min(this.velocity[n], e), -1 * e)),
                            (this.current[n] += this.velocity[n]))
                        : (this.current[n] = this.target[n])
                this.setTransform(),
                    this.setEdgeForce(),
                    !this.isResting || this.isDragging
                        ? (this.rAF = requestAnimationFrame(() => this.animate()))
                        : this.stop("current")
            }
            setTargetForce() {
                for (let t of ot)
                    (t === "e" && this.isBouncingX) ||
                        (t === "f" && this.isBouncingY) ||
                        (this.velocity[t] = (1 / (1 - this.friction) - 1) * (this.target[t] - this.current[t]))
            }
            checkBounds(t = 0, e = 0) {
                let { current: n } = this,
                    i = n.e + t,
                    s = n.f + e,
                    l = this.getBounds(),
                    { x: c, y: h } = l,
                    m = c.min,
                    a = c.max,
                    r = h.min,
                    d = h.max,
                    u = 0,
                    p = 0
                return (
                    m !== 1 / 0 && i < m ? (u = m - i) : a !== 1 / 0 && i > a && (u = a - i),
                    r !== 1 / 0 && s < r ? (p = r - s) : d !== 1 / 0 && s > d && (p = d - s),
                    Math.abs(u) < 1e-4 && (u = 0),
                    Math.abs(p) < 1e-4 && (p = 0),
                    Object.assign(Object.assign({}, l), {
                        xDiff: u,
                        yDiff: p,
                        inBounds: !u && !p,
                    })
                )
            }
            clampTargetBounds() {
                let { target: t } = this,
                    { x: e, y: n } = this.getBounds()
                e.min !== 1 / 0 && (t.e = Math.max(t.e, e.min)),
                    e.max !== 1 / 0 && (t.e = Math.min(t.e, e.max)),
                    n.min !== 1 / 0 && (t.f = Math.max(t.f, n.min)),
                    n.max !== 1 / 0 && (t.f = Math.min(t.f, n.max))
            }
            calculateContentDim(t = this.current) {
                let { content: e, contentRect: n } = this,
                    { fitWidth: i, fitHeight: s, fullWidth: l, fullHeight: c } = n,
                    h = l,
                    m = c
                if (this.option("zoom") || this.angle !== 0) {
                    let a =
                        !(e instanceof HTMLImageElement) &&
                        (window.getComputedStyle(e).maxWidth === "none" ||
                            window.getComputedStyle(e).maxHeight === "none"),
                        r = a ? l : i,
                        d = a ? c : s,
                        u = this.getMatrix(t),
                        p = new DOMPoint(0, 0).matrixTransform(u),
                        f = new DOMPoint(0 + r, 0).matrixTransform(u),
                        Q = new DOMPoint(0 + r, 0 + d).matrixTransform(u),
                        b = new DOMPoint(0, 0 + d).matrixTransform(u),
                        g = Math.abs(Q.x - p.x),
                        B = Math.abs(Q.y - p.y),
                        x = Math.abs(b.x - f.x),
                        E = Math.abs(b.y - f.y)
                        ; (h = Math.max(g, x)), (m = Math.max(B, E))
                }
                return { contentWidth: h, contentHeight: m }
            }
            setEdgeForce() {
                if (this.ignoreBounds || this.isDragging || this.panMode === z || this.targetScale < this.scale)
                    return (this.isBouncingX = false), void (this.isBouncingY = false)
                let { target: t } = this,
                    { x: e, y: n, xDiff: i, yDiff: s } = this.checkBounds(),
                    l = this.option("maxVelocity"),
                    c = this.velocity.e,
                    h = this.velocity.f
                i !== 0
                    ? ((this.isBouncingX = true),
                        i * c <= 0
                            ? (c += 0.14 * i)
                            : ((c = 0.14 * i),
                                e.min !== 1 / 0 && (this.target.e = Math.max(t.e, e.min)),
                                e.max !== 1 / 0 && (this.target.e = Math.min(t.e, e.max))),
                        l && (c = Math.max(Math.min(c, l), -1 * l)))
                    : (this.isBouncingX = false),
                    s !== 0
                        ? ((this.isBouncingY = true),
                            s * h <= 0
                                ? (h += 0.14 * s)
                                : ((h = 0.14 * s),
                                    n.min !== 1 / 0 && (this.target.f = Math.max(t.f, n.min)),
                                    n.max !== 1 / 0 && (this.target.f = Math.min(t.f, n.max))),
                            l && (h = Math.max(Math.min(h, l), -1 * l)))
                        : (this.isBouncingY = false),
                    this.isBouncingX && (this.velocity.e = c),
                    this.isBouncingY && (this.velocity.f = h)
            }
            enable() {
                let { content: t } = this,
                    e = new DOMMatrixReadOnly(window.getComputedStyle(t).transform)
                for (let n of ot) this.current[n] = this.target[n] = e[n]
                this.updateMetrics(),
                    this.attachObserver(),
                    this.attachEvents(),
                    (this.state = O.Ready),
                    this.emit("ready")
            }
            onClick(t) {
                var e
                t.type === "click" && t.detail === 0 && ((this.dragOffset.x = 0), (this.dragOffset.y = 0)),
                    this.isDragging &&
                    ((e = this.pointerTracker) === null || e === void 0 || e.clear(),
                        (this.trackingPoints = []),
                        this.startDecelAnim())
                let n = t.target
                if (!n || t.defaultPrevented) return
                if (n.hasAttribute("disabled")) return t.preventDefault(), void t.stopPropagation()
                if (
                    (() => {
                        let u = window.getSelection()
                        return u && u.type === "Range"
                    })() &&
                    !n.closest("button")
                )
                    return
                let i = n.closest("[data-panzoom-action]"),
                    s = n.closest("[data-panzoom-change]"),
                    l = i || s,
                    c = l && N(l) ? l.dataset : null
                if (c) {
                    let u = c.panzoomChange,
                        p = c.panzoomAction
                    if (((u || p) && t.preventDefault(), u)) {
                        let f = {}
                        try {
                            f = JSON.parse(u)
                        } catch {
                            console && console.warn("The given data was not valid JSON")
                        }
                        return void this.applyChange(f)
                    }
                    if (p) return void (this[p] && this[p]())
                }
                if (Math.abs(this.dragOffset.x) > 3 || Math.abs(this.dragOffset.y) > 3)
                    return t.preventDefault(), void t.stopPropagation()
                if (n.closest("[data-fancybox]")) return
                let h = this.content.getBoundingClientRect(),
                    m = this.dragStart
                if (m.time && !this.canZoomOut() && (Math.abs(h.x - m.x) > 2 || Math.abs(h.y - m.y) > 2)) return
                this.dragStart.time = 0
                let a = u => {
                    this.option("zoom", t) &&
                        u &&
                        typeof u == "string" &&
                        /(iterateZoom)|(toggle(Zoom|Full|Cover|Max)|(zoomTo(Fit|Cover|Max)))/.test(u) &&
                        typeof this[u] == "function" &&
                        (t.preventDefault(), this[u]({ event: t }))
                },
                    r = this.option("click", t),
                    d = this.option("dblClick", t)
                d
                    ? (this.clicks++,
                        this.clicks == 1 &&
                        (this.clickTimer = setTimeout(() => {
                            this.clicks === 1
                                ? (this.emit("click", t), !t.defaultPrevented && r && a(r))
                                : (this.emit("dblClick", t), t.defaultPrevented || a(d)),
                                (this.clicks = 0),
                                (this.clickTimer = null)
                        }, 350)))
                    : (this.emit("click", t), !t.defaultPrevented && r && a(r))
            }
            addTrackingPoint(t) {
                let e = this.trackingPoints.filter(n => n.time > Date.now() - 100)
                e.push(t), (this.trackingPoints = e)
            }
            onPointerDown(t, e, n) {
                var i
                if (this.option("touch", t) === false) return false
                    ; (this.pwt = 0), (this.dragOffset = { x: 0, y: 0, time: 0 }), (this.trackingPoints = [])
                let s = this.content.getBoundingClientRect()
                if (
                    ((this.dragStart = {
                        x: s.x,
                        y: s.y,
                        top: s.top,
                        left: s.left,
                        time: Date.now(),
                    }),
                        this.clickTimer)
                )
                    return false
                if (this.panMode === z && this.targetScale > 1) return t.preventDefault(), t.stopPropagation(), false
                let l = t.composedPath()[0]
                if (!n.length) {
                    if (
                        ["TEXTAREA", "OPTION", "INPUT", "SELECT", "VIDEO", "IFRAME"].includes(l.nodeName) ||
                        l.closest(
                            "[contenteditable],[data-selectable],[data-draggable],[data-clickable],[data-panzoom-change],[data-panzoom-action]"
                        )
                    )
                        return false
                            ; (i = window.getSelection()) === null || i === void 0 || i.removeAllRanges()
                }
                if (t.type === "mousedown") ["A", "BUTTON"].includes(l.nodeName) || t.preventDefault()
                else if (Math.abs(this.velocity.a) > 0.3) return false
                return (
                    (this.target.e = this.current.e),
                    (this.target.f = this.current.f),
                    this.stop(),
                    this.isDragging || ((this.isDragging = true), this.addTrackingPoint(e), this.emit("touchStart", t)),
                    true
                )
            }
            onPointerMove(t, e, n) {
                if (
                    this.option("touch", t) === false ||
                    !this.isDragging ||
                    (e.length < 2 && this.panOnlyZoomed && F(this.targetScale) <= F(this.minScale)) ||
                    (this.emit("touchMove", t), t.defaultPrevented)
                )
                    return
                this.addTrackingPoint(e[0])
                let { content: i } = this,
                    s = pi(n[0], n[1]),
                    l = pi(e[0], e[1]),
                    c = 0,
                    h = 0
                if (e.length > 1) {
                    let B = i.getBoundingClientRect()
                        ; (c = s.clientX - B.left - 0.5 * B.width), (h = s.clientY - B.top - 0.5 * B.height)
                }
                let m = mi(n[0], n[1]),
                    a = mi(e[0], e[1]),
                    r = m ? a / m : 1,
                    d = l.clientX - s.clientX,
                    u = l.clientY - s.clientY
                    ; (this.dragOffset.x += d),
                        (this.dragOffset.y += u),
                        (this.dragOffset.time = Date.now() - this.dragStart.time)
                let p = F(this.targetScale) === F(this.minScale) && this.option("lockAxis")
                if (p && !this.lockedAxis)
                    if (p === "xy" || p === "y" || t.type === "touchmove") {
                        if (Math.abs(this.dragOffset.x) < 6 && Math.abs(this.dragOffset.y) < 6)
                            return void t.preventDefault()
                        let B = Math.abs((180 * Math.atan2(this.dragOffset.y, this.dragOffset.x)) / Math.PI)
                            ; (this.lockedAxis = B > 45 && B < 135 ? "y" : "x"),
                                (this.dragOffset.x = 0),
                                (this.dragOffset.y = 0),
                                (d = 0),
                                (u = 0)
                    } else this.lockedAxis = p
                if (
                    (Qe(t.target, this.content) && ((p = "x"), (this.dragOffset.y = 0)),
                        p && p !== "xy" && this.lockedAxis !== p && F(this.targetScale) === F(this.minScale))
                )
                    return
                t.cancelable && t.preventDefault(), this.container.classList.add(this.cn("isDragging"))
                let f = this.checkBounds(d, u)
                this.option("rubberband")
                    ? (this.isInfinite !== "x" &&
                        ((f.xDiff > 0 && d < 0) || (f.xDiff < 0 && d > 0)) &&
                        (d *= Math.max(0, 0.5 - Math.abs((0.75 / this.contentRect.fitWidth) * f.xDiff))),
                        this.isInfinite !== "y" &&
                        ((f.yDiff > 0 && u < 0) || (f.yDiff < 0 && u > 0)) &&
                        (u *= Math.max(0, 0.5 - Math.abs((0.75 / this.contentRect.fitHeight) * f.yDiff))))
                    : (f.xDiff && (d = 0), f.yDiff && (u = 0))
                let Q = this.targetScale,
                    b = this.minScale,
                    g = this.maxScale
                Q < 0.5 * b && (r = Math.max(r, b)),
                    Q > 1.5 * g && (r = Math.min(r, g)),
                    this.lockedAxis === "y" && F(Q) === F(b) && (d = 0),
                    this.lockedAxis === "x" && F(Q) === F(b) && (u = 0),
                    this.applyChange({
                        originX: c,
                        originY: h,
                        panX: d,
                        panY: u,
                        scale: r,
                        friction: this.option("dragFriction"),
                        ignoreBounds: true,
                    })
            }
            onPointerUp(t, e, n) {
                if (n.length) return (this.dragOffset.x = 0), (this.dragOffset.y = 0), void (this.trackingPoints = [])
                this.container.classList.remove(this.cn("isDragging")),
                    this.isDragging &&
                    (this.addTrackingPoint(e),
                        this.panOnlyZoomed &&
                        this.contentRect.width - this.contentRect.fitWidth < 1 &&
                        this.contentRect.height - this.contentRect.fitHeight < 1 &&
                        (this.trackingPoints = []),
                        Qe(t.target, this.content) && this.lockedAxis === "y" && (this.trackingPoints = []),
                        this.emit("touchEnd", t),
                        (this.isDragging = false),
                        (this.lockedAxis = false),
                        this.state !== O.Destroy && (t.defaultPrevented || this.startDecelAnim()))
            }
            startDecelAnim() {
                var t
                let e = this.isScaling
                this.rAF && (cancelAnimationFrame(this.rAF), (this.rAF = null)),
                    (this.isBouncingX = false),
                    (this.isBouncingY = false)
                for (let B of ot) this.velocity[B] = 0
                    ; (this.target.e = this.current.e),
                        (this.target.f = this.current.f),
                        Z(this.container, "is-scaling"),
                        Z(this.container, "is-animating"),
                        (this.isTicking = false)
                let { trackingPoints: n } = this,
                    i = n[0],
                    s = n[n.length - 1],
                    l = 0,
                    c = 0,
                    h = 0
                s && i && ((l = s.clientX - i.clientX), (c = s.clientY - i.clientY), (h = s.time - i.time))
                let m = ((t = window.visualViewport) === null || t === void 0 ? void 0 : t.scale) || 1
                m !== 1 && ((l *= m), (c *= m))
                let a = 0,
                    r = 0,
                    d = 0,
                    u = 0,
                    p = this.option("decelFriction"),
                    f = this.targetScale
                if (h > 0) {
                    ; (d = Math.abs(l) > 3 ? l / (h / 30) : 0), (u = Math.abs(c) > 3 ? c / (h / 30) : 0)
                    let B = this.option("maxVelocity")
                    B && ((d = Math.max(Math.min(d, B), -1 * B)), (u = Math.max(Math.min(u, B), -1 * B)))
                }
                d && (a = d / (1 / (1 - p) - 1)),
                    u && (r = u / (1 / (1 - p) - 1)),
                    (this.option("lockAxis") === "y" ||
                        (this.option("lockAxis") === "xy" && this.lockedAxis === "y" && F(f) === this.minScale)) &&
                    (a = d = 0),
                    (this.option("lockAxis") === "x" ||
                        (this.option("lockAxis") === "xy" && this.lockedAxis === "x" && F(f) === this.minScale)) &&
                    (r = u = 0)
                let Q = this.dragOffset.x,
                    b = this.dragOffset.y,
                    g = this.option("dragMinThreshold") || 0
                Math.abs(Q) < g && Math.abs(b) < g && ((a = r = 0), (d = u = 0)),
                    ((this.option("zoom") && (f < this.minScale - 1e-5 || f > this.maxScale + 1e-5)) ||
                        (e && !a && !r)) &&
                    (p = 0.35),
                    this.applyChange({ panX: a, panY: r, friction: p }),
                    this.emit("decel", d, u, Q, b)
            }
            onWheel(t) {
                var e = [-t.deltaX || 0, -t.deltaY || 0, -t.detail || 0].reduce(function (s, l) {
                    return Math.abs(l) > Math.abs(s) ? l : s
                })
                let n = Math.max(-1, Math.min(1, e))
                if ((this.emit("wheel", t, n), this.panMode === z || t.defaultPrevented)) return
                let i = this.option("wheel")
                i === "pan"
                    ? (t.preventDefault(),
                        (this.panOnlyZoomed && !this.canZoomOut()) ||
                        this.applyChange({
                            panX: 2 * -t.deltaX,
                            panY: 2 * -t.deltaY,
                            bounce: false,
                        }))
                    : i === "zoom" && this.option("zoom") !== false && this.zoomWithWheel(t)
            }
            onMouseMove(t) {
                this.panWithMouse(t)
            }
            onKeydown(t) {
                t.key === "Escape" && this.toggleFS()
            }
            onResize() {
                this.updateMetrics(), this.checkBounds().inBounds || this.requestTick()
            }
            setTransform() {
                this.emit("beforeTransform")
                let { current: t, target: e, content: n, contentRect: i } = this,
                    s = Object.assign({}, oe)
                for (let Q of ot) {
                    let b = Q == "e" || Q === "f" ? ae : ua
                        ; (s[Q] = F(t[Q], b)),
                            Math.abs(e[Q] - t[Q]) < (Q == "e" || Q === "f" ? 0.51 : 0.001) && (t[Q] = e[Q])
                }
                let { a: l, b: c, c: h, d: m, e: a, f: r } = s,
                    d = `matrix(${l}, ${c}, ${h}, ${m}, ${a}, ${r})`,
                    u = n.parentElement instanceof HTMLPictureElement ? n.parentElement : n
                if ((this.option("transformParent") && (u = u.parentElement || u), u.style.transform === d)) return
                u.style.transform = d
                let { contentWidth: p, contentHeight: f } = this.calculateContentDim()
                    ; (i.width = p), (i.height = f), this.emit("afterTransform")
            }
            updateMetrics(t = false) {
                var e
                if (!this || this.state === O.Destroy || this.isContentLoading) return
                let n = Math.max(1, ((e = window.visualViewport) === null || e === void 0 ? void 0 : e.scale) || 1),
                    { container: i, content: s } = this,
                    l = s instanceof HTMLImageElement,
                    c = i.getBoundingClientRect(),
                    h = getComputedStyle(this.container),
                    m = c.width * n,
                    a = c.height * n,
                    r = parseFloat(h.paddingTop) + parseFloat(h.paddingBottom),
                    d = m - (parseFloat(h.paddingLeft) + parseFloat(h.paddingRight)),
                    u = a - r
                this.containerRect = {
                    width: m,
                    height: a,
                    innerWidth: d,
                    innerHeight: u,
                }
                let p =
                    parseFloat(s.dataset.width || "") ||
                    (L => {
                        let Y = 0
                        return (
                            (Y =
                                L instanceof HTMLImageElement
                                    ? L.naturalWidth
                                    : L instanceof SVGElement
                                        ? L.width.baseVal.value
                                        : Math.max(L.offsetWidth, L.scrollWidth)),
                            Y || 0
                        )
                    })(s),
                    f =
                        parseFloat(s.dataset.height || "") ||
                        (L => {
                            let Y = 0
                            return (
                                (Y =
                                    L instanceof HTMLImageElement
                                        ? L.naturalHeight
                                        : L instanceof SVGElement
                                            ? L.height.baseVal.value
                                            : Math.max(L.offsetHeight, L.scrollHeight)),
                                Y || 0
                            )
                        })(s),
                    Q = this.option("width", p) || H,
                    b = this.option("height", f) || H,
                    g = Q === H,
                    B = b === H
                typeof Q != "number" && (Q = p),
                    typeof b != "number" && (b = f),
                    g && (Q = p * (b / f)),
                    B && (b = f / (p / Q))
                let x = s.parentElement instanceof HTMLPictureElement ? s.parentElement : s
                this.option("transformParent") && (x = x.parentElement || x)
                let E = x.getAttribute("style") || ""
                x.style.setProperty("transform", "none", "important"),
                    l && ((x.style.width = ""), (x.style.height = "")),
                    x.offsetHeight
                let W = s.getBoundingClientRect(),
                    y = W.width * n,
                    w = W.height * n,
                    k = y,
                    U = w
                    ; (y = Math.min(y, Q)),
                        (w = Math.min(w, b)),
                        l
                            ? ({ width: y, height: w } = ((L, Y, ke, Jt) => {
                                let zt = ke / L,
                                    lt = Jt / Y,
                                    Ht = Math.min(zt, lt)
                                return { width: (L *= Ht), height: (Y *= Ht) }
                            })(Q, b, y, w))
                            : ((y = Math.min(y, Q)), (w = Math.min(w, b)))
                let S = 0.5 * (U - w),
                    T = 0.5 * (k - y)
                    ; (this.contentRect = Object.assign(Object.assign({}, this.contentRect), {
                        top: W.top - c.top + S,
                        bottom: c.bottom - W.bottom + S,
                        left: W.left - c.left + T,
                        right: c.right - W.right + T,
                        fitWidth: y,
                        fitHeight: w,
                        width: y,
                        height: w,
                        fullWidth: Q,
                        fullHeight: b,
                    })),
                        (x.style.cssText = E),
                        l && ((x.style.width = `${y}px`), (x.style.height = `${w}px`)),
                        this.setTransform(),
                        t !== true && this.emit("refresh"),
                        this.ignoreBounds ||
                        (F(this.targetScale) < F(this.minScale)
                            ? this.zoomTo(this.minScale, { friction: 0 })
                            : this.targetScale > this.maxScale
                                ? this.zoomTo(this.maxScale, { friction: 0 })
                                : this.state === O.Init || this.checkBounds().inBounds || this.requestTick()),
                        this.updateControls()
            }
            calculateBounds() {
                let { contentWidth: t, contentHeight: e } = this.calculateContentDim(this.target),
                    { targetScale: n, lockedAxis: i } = this,
                    { fitWidth: s, fitHeight: l } = this.contentRect,
                    c = 0,
                    h = 0,
                    m = 0,
                    a = 0,
                    r = this.option("infinite")
                if (r === true || (i && r === i)) (c = -1 / 0), (m = 1 / 0), (h = -1 / 0), (a = 1 / 0)
                else {
                    let { containerRect: d, contentRect: u } = this,
                        p = F(s * n, ae),
                        f = F(l * n, ae),
                        { innerWidth: Q, innerHeight: b } = d
                    if ((d.width === p && (Q = d.width), d.width === f && (b = d.height), t > Q)) {
                        ; (m = 0.5 * (t - Q)), (c = -1 * m)
                        let g = 0.5 * (u.right - u.left)
                            ; (c += g), (m += g)
                    }
                    if ((s > Q && t < Q && ((c -= 0.5 * (s - Q)), (m -= 0.5 * (s - Q))), e > b)) {
                        ; (a = 0.5 * (e - b)), (h = -1 * a)
                        let g = 0.5 * (u.bottom - u.top)
                            ; (h += g), (a += g)
                    }
                    l > b && e < b && ((c -= 0.5 * (l - b)), (m -= 0.5 * (l - b)))
                }
                return { x: { min: c, max: m }, y: { min: h, max: a } }
            }
            getBounds() {
                let t = this.option("bounds")
                return t !== H ? t : this.calculateBounds()
            }
            updateControls() {
                let t = this,
                    e = t.container,
                    { panMode: n, contentRect: i, targetScale: s, minScale: l } = t,
                    c = l,
                    h = t.option("click") || false
                h && (c = t.getNextScale(h))
                let m = t.canZoomIn(),
                    a = t.canZoomOut(),
                    r = n === Qi && !!this.option("touch"),
                    d = a && r
                if (
                    (r &&
                        (F(s) < F(l) && !this.panOnlyZoomed && (d = true),
                            (F(i.width, 1) > F(i.fitWidth, 1) || F(i.height, 1) > F(i.fitHeight, 1)) && (d = true)),
                        F(i.width * s, 1) < F(i.fitWidth, 1) && (d = false),
                        n === z && (d = false),
                        et(e, this.cn("isDraggable"), d),
                        !this.option("zoom"))
                )
                    return
                let u = m && F(c) > F(s),
                    p = !u && !d && a && F(c) < F(s)
                et(e, this.cn("canZoomIn"), u), et(e, this.cn("canZoomOut"), p)
                for (let f of e.querySelectorAll("[data-panzoom-action]")) {
                    let Q = false,
                        b = false
                    switch (f.dataset.panzoomAction) {
                        case "zoomIn":
                            m ? (Q = true) : (b = true)
                            break
                        case "zoomOut":
                            a ? (Q = true) : (b = true)
                            break
                        case "toggleZoom":
                        case "iterateZoom":
                            m || a ? (Q = true) : (b = true)
                            let g = f.querySelector("g")
                            g && (g.style.display = m ? "" : "none")
                    }
                    Q
                        ? (f.removeAttribute("disabled"), f.removeAttribute("tabindex"))
                        : b && (f.setAttribute("disabled", ""), f.setAttribute("tabindex", "-1"))
                }
            }
            panTo({
                x: t = this.target.e,
                y: e = this.target.f,
                scale: n = this.targetScale,
                friction: i = this.option("friction"),
                angle: s = 0,
                originX: l = 0,
                originY: c = 0,
                flipX: h = false,
                flipY: m = false,
                ignoreBounds: a = false,
            }) {
                this.state !== O.Destroy &&
                    this.applyChange({
                        panX: t - this.target.e,
                        panY: e - this.target.f,
                        scale: n / this.targetScale,
                        angle: s,
                        originX: l,
                        originY: c,
                        friction: i,
                        flipX: h,
                        flipY: m,
                        ignoreBounds: a,
                    })
            }
            applyChange({
                panX: t = 0,
                panY: e = 0,
                scale: n = 1,
                angle: i = 0,
                originX: s = -this.current.e,
                originY: l = -this.current.f,
                friction: c = this.option("friction"),
                flipX: h = false,
                flipY: m = false,
                ignoreBounds: a = false,
                bounce: r = this.option("bounce"),
            }) {
                let d = this.state
                if (d === O.Destroy) return
                this.rAF && (cancelAnimationFrame(this.rAF), (this.rAF = null)),
                    (this.friction = c || 0),
                    (this.ignoreBounds = a)
                let { current: u } = this,
                    p = u.e,
                    f = u.f,
                    Q = this.getMatrix(this.target),
                    b = new DOMMatrix().translate(p, f).translate(s, l).translate(t, e)
                if (this.option("zoom")) {
                    if (!a) {
                        let g = this.targetScale,
                            B = this.minScale,
                            x = this.maxScale
                        g * n < B && (n = B / g), g * n > x && (n = x / g)
                    }
                    b = b.scale(n)
                }
                ; (b = b.translate(-s, -l).translate(-p, -f).multiply(Q)),
                    i && (b = b.rotate(i)),
                    h && (b = b.scale(-1, 1)),
                    m && (b = b.scale(1, -1))
                for (let g of ot)
                    g !== "e" && g !== "f" && (b[g] > this.minScale + 1e-5 || b[g] < this.minScale - 1e-5)
                        ? (this.target[g] = b[g])
                        : (this.target[g] = F(b[g], ae))
                        ; (this.targetScale < this.scale || Math.abs(n - 1) > 0.1 || this.panMode === z || r === false) &&
                            !a &&
                            this.clampTargetBounds(),
                            d === O.Init ? this.animate() : this.isResting || ((this.state = O.Panning), this.requestTick())
            }
            stop(t = false) {
                if (this.state === O.Init || this.state === O.Destroy) return
                let e = this.isTicking
                this.rAF && (cancelAnimationFrame(this.rAF), (this.rAF = null)),
                    (this.isBouncingX = false),
                    (this.isBouncingY = false)
                for (let n of ot)
                    (this.velocity[n] = 0),
                        t === "current"
                            ? (this.current[n] = this.target[n])
                            : t === "target" && (this.target[n] = this.current[n])
                this.setTransform(),
                    Z(this.container, "is-scaling"),
                    Z(this.container, "is-animating"),
                    (this.isTicking = false),
                    (this.state = O.Ready),
                    e && (this.emit("endAnimation"), this.updateControls())
            }
            requestTick() {
                this.isTicking ||
                    (this.emit("startAnimation"),
                        this.updateControls(),
                        v(this.container, "is-animating"),
                        this.isScaling && v(this.container, "is-scaling")),
                    (this.isTicking = true),
                    this.rAF || (this.rAF = requestAnimationFrame(() => this.animate()))
            }
            panWithMouse(t, e = this.option("mouseMoveFriction")) {
                if (((this.pmme = t), this.panMode !== z || !t || F(this.targetScale) <= F(this.minScale))) return
                this.emit("mouseMove", t)
                let { container: n, containerRect: i, contentRect: s } = this,
                    l = i.width,
                    c = i.height,
                    h = n.getBoundingClientRect(),
                    m = (t.clientX || 0) - h.left,
                    a = (t.clientY || 0) - h.top,
                    { contentWidth: r, contentHeight: d } = this.calculateContentDim(this.target),
                    u = this.option("mouseMoveFactor")
                u > 1 && (r !== l && (r *= u), d !== c && (d *= u))
                let p = 0.5 * (r - l) - (((m / l) * 100) / 100) * (r - l)
                p += 0.5 * (s.right - s.left)
                let f = 0.5 * (d - c) - (((a / c) * 100) / 100) * (d - c)
                    ; (f += 0.5 * (s.bottom - s.top)),
                        this.applyChange({
                            panX: p - this.target.e,
                            panY: f - this.target.f,
                            friction: e,
                        })
            }
            zoomWithWheel(t) {
                if (this.state === O.Destroy || this.state === O.Init) return
                let e = Date.now()
                if (e - this.pwt < 45) return void t.preventDefault()
                this.pwt = e
                var n = [-t.deltaX || 0, -t.deltaY || 0, -t.detail || 0].reduce(function (m, a) {
                    return Math.abs(a) > Math.abs(m) ? a : m
                })
                let i = Math.max(-1, Math.min(1, n)),
                    { targetScale: s, maxScale: l, minScale: c } = this,
                    h = (s * (100 + 45 * i)) / 100
                F(h) < F(c) && F(s) <= F(c)
                    ? ((this.cwd += Math.abs(i)), (h = c))
                    : F(h) > F(l) && F(s) >= F(l)
                        ? ((this.cwd += Math.abs(i)), (h = l))
                        : ((this.cwd = 0), (h = Math.max(Math.min(h, l), c))),
                    this.cwd > this.option("wheelLimit") ||
                    (t.preventDefault(), F(h) !== F(s) && this.zoomTo(h, { event: t }))
            }
            canZoomIn() {
                return (
                    this.option("zoom") &&
                    (F(this.contentRect.width, 1) < F(this.contentRect.fitWidth, 1) ||
                        F(this.targetScale) < F(this.maxScale))
                )
            }
            canZoomOut() {
                return this.option("zoom") && F(this.targetScale) > F(this.minScale)
            }
            zoomIn(t = 1.25, e) {
                this.zoomTo(this.targetScale * t, e)
            }
            zoomOut(t = 0.8, e) {
                this.zoomTo(this.targetScale * t, e)
            }
            zoomToFit(t) {
                this.zoomTo("fit", t)
            }
            zoomToCover(t) {
                this.zoomTo("cover", t)
            }
            zoomToFull(t) {
                this.zoomTo("full", t)
            }
            zoomToMax(t) {
                this.zoomTo("max", t)
            }
            toggleZoom(t) {
                this.zoomTo(this.getNextScale("toggleZoom"), t)
            }
            toggleMax(t) {
                this.zoomTo(this.getNextScale("toggleMax"), t)
            }
            toggleCover(t) {
                this.zoomTo(this.getNextScale("toggleCover"), t)
            }
            iterateZoom(t) {
                this.zoomTo("next", t)
            }
            zoomTo(t = 1, { friction: e = H, originX: n = H, originY: i = H, event: s } = {}) {
                if (this.isContentLoading || this.state === O.Destroy) return
                let { targetScale: l, fullScale: c, maxScale: h, coverScale: m } = this
                if ((this.stop(), this.panMode === z && (s = this.pmme || s), s || n === H || i === H)) {
                    let r = this.content.getBoundingClientRect(),
                        d = this.container.getBoundingClientRect(),
                        u = s ? s.clientX : d.left + 0.5 * d.width,
                        p = s ? s.clientY : d.top + 0.5 * d.height
                        ; (n = u - r.left - 0.5 * r.width), (i = p - r.top - 0.5 * r.height)
                }
                let a = 1
                typeof t == "number"
                    ? (a = t)
                    : t === "full"
                        ? (a = c)
                        : t === "cover"
                            ? (a = m)
                            : t === "max"
                                ? (a = h)
                                : t === "fit"
                                    ? (a = 1)
                                    : t === "next" && (a = this.getNextScale("iterateZoom")),
                    (a = a / l || 1),
                    (e = e === H ? (a > 1 ? 0.15 : 0.25) : e),
                    this.applyChange({ scale: a, originX: n, originY: i, friction: e }),
                    s && this.panMode === z && this.panWithMouse(s, e)
            }
            rotateCCW() {
                this.applyChange({ angle: -90 })
            }
            rotateCW() {
                this.applyChange({ angle: 90 })
            }
            flipX() {
                this.applyChange({ flipX: true })
            }
            flipY() {
                this.applyChange({ flipY: true })
            }
            fitX() {
                this.stop("target")
                let { containerRect: t, contentRect: e, target: n } = this
                this.applyChange({
                    panX: 0.5 * t.width - (e.left + 0.5 * e.fitWidth) - n.e,
                    panY: 0.5 * t.height - (e.top + 0.5 * e.fitHeight) - n.f,
                    scale: t.width / e.fitWidth / this.targetScale,
                    originX: 0,
                    originY: 0,
                    ignoreBounds: true,
                })
            }
            fitY() {
                this.stop("target")
                let { containerRect: t, contentRect: e, target: n } = this
                this.applyChange({
                    panX: 0.5 * t.width - (e.left + 0.5 * e.fitWidth) - n.e,
                    panY: 0.5 * t.innerHeight - (e.top + 0.5 * e.fitHeight) - n.f,
                    scale: t.height / e.fitHeight / this.targetScale,
                    originX: 0,
                    originY: 0,
                    ignoreBounds: true,
                })
            }
            toggleFS() {
                let { container: t } = this,
                    e = this.cn("inFullscreen"),
                    n = this.cn("htmlHasFullscreen")
                t.classList.toggle(e)
                let i = t.classList.contains(e)
                i
                    ? (document.documentElement.classList.add(n),
                        document.addEventListener("keydown", this.onKeydown, true))
                    : (document.documentElement.classList.remove(n),
                        document.removeEventListener("keydown", this.onKeydown, true)),
                    this.updateMetrics(),
                    this.emit(i ? "enterFS" : "exitFS")
            }
            getMatrix(t = this.current) {
                let { a: e, b: n, c: i, d: s, e: l, f: c } = t
                return new DOMMatrix([e, n, i, s, l, c])
            }
            reset(t) {
                if (this.state !== O.Init && this.state !== O.Destroy) {
                    this.stop("current")
                    for (let e of ot) this.target[e] = oe[e]
                        ; (this.target.a = this.minScale),
                            (this.target.d = this.minScale),
                            this.clampTargetBounds(),
                            this.isResting ||
                            ((this.friction = t === void 0 ? this.option("friction") : t),
                                (this.state = O.Panning),
                                this.requestTick())
                }
            }
            destroy() {
                this.stop(), (this.state = O.Destroy), this.detachEvents(), this.detachObserver()
                let { container: t, content: e } = this,
                    n = this.option("classes") || {}
                for (let i of Object.values(n)) t.classList.remove(i + "")
                e && (e.removeEventListener("load", this.onLoad), e.removeEventListener("error", this.onError)),
                    this.detachPlugins()
            }
        }
    Object.defineProperty(Qt, "defaults", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: ha,
    }),
        Object.defineProperty(Qt, "Plugins", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {},
        })
    var gi = function (o, t) {
        let e = true
        return (...n) => {
            e &&
                ((e = false),
                    o(...n),
                    setTimeout(() => {
                        e = true
                    }, t))
        }
    },
        Fi = (o, t) => {
            let e = []
            return (
                o.childNodes.forEach(n => {
                    n.nodeType !== Node.ELEMENT_NODE || (t && !n.matches(t)) || e.push(n)
                }),
                e
            )
        },
        ma = {
            viewport: null,
            track: null,
            enabled: true,
            slides: [],
            axis: "x",
            transition: "fade",
            preload: 1,
            slidesPerPage: "auto",
            initialPage: 0,
            friction: 0.12,
            Panzoom: { decelFriction: 0.12 },
            center: true,
            infinite: true,
            fill: true,
            dragFree: false,
            adaptiveHeight: false,
            direction: "ltr",
            classes: {
                container: "f-carousel",
                viewport: "f-carousel__viewport",
                track: "f-carousel__track",
                slide: "f-carousel__slide",
                isLTR: "is-ltr",
                isRTL: "is-rtl",
                isHorizontal: "is-horizontal",
                isVertical: "is-vertical",
                inTransition: "in-transition",
                isSelected: "is-selected",
            },
            l10n: {
                NEXT: "Next slide",
                PREV: "Previous slide",
                GOTO: "Go to slide #%d",
            },
        },
        D
        ; (function (o) {
            ; (o[(o.Init = 0)] = "Init"), (o[(o.Ready = 1)] = "Ready"), (o[(o.Destroy = 2)] = "Destroy")
        })(D || (D = {}))
    var un = o => {
        if (typeof o == "string" || o instanceof HTMLElement) o = { html: o }
        else {
            let t = o.thumb
            t !== void 0 &&
                (typeof t == "string" && (o.thumbSrc = t),
                    t instanceof HTMLImageElement && ((o.thumbEl = t), (o.thumbElSrc = t.src), (o.thumbSrc = t.src)),
                    delete o.thumb)
        }
        return Object.assign(
            {
                html: "",
                el: null,
                isDom: false,
                class: "",
                customClass: "",
                index: -1,
                dim: 0,
                gap: 0,
                pos: 0,
                transition: false,
            },
            o
        )
    },
        pa = (o = {}) => Object.assign({ index: -1, slides: [], dim: 0, pos: -1 }, o),
        A = class extends yt {
            constructor(t, e) {
                super(e),
                    Object.defineProperty(this, "instance", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: t,
                    })
            }
            attach() { }
            detach() { }
        },
        fa = {
            classes: {
                list: "f-carousel__dots",
                isDynamic: "is-dynamic",
                hasDots: "has-dots",
                dot: "f-carousel__dot",
                isBeforePrev: "is-before-prev",
                isPrev: "is-prev",
                isCurrent: "is-current",
                isNext: "is-next",
                isAfterNext: "is-after-next",
            },
            dotTpl: '<button type="button" data-carousel-page="%i" aria-label="{{GOTO}}"><span class="f-carousel__dot" aria-hidden="true"></span></button>',
            dynamicFrom: 11,
            maxCount: 1 / 0,
            minCount: 2,
        },
        be = class extends A {
            constructor() {
                super(...arguments),
                    Object.defineProperty(this, "isDynamic", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: false,
                    }),
                    Object.defineProperty(this, "list", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: null,
                    })
            }
            onRefresh() {
                this.refresh()
            }
            build() {
                let t = this.list
                if (!t) {
                    ; (t = document.createElement("ul")), v(t, this.cn("list")), t.setAttribute("role", "tablist")
                    let e = this.instance.container
                    e.appendChild(t), v(e, this.cn("hasDots")), (this.list = t)
                }
                return t
            }
            refresh() {
                var t
                let e = this.instance.pages.length,
                    n = Math.min(2, this.option("minCount")),
                    i = Math.max(2e3, this.option("maxCount")),
                    s = this.option("dynamicFrom")
                if (e < n || e > i) return void this.cleanup()
                let l = typeof s == "number" && e > 5 && e >= s,
                    c = !this.list || this.isDynamic !== l || this.list.children.length !== e
                c && this.cleanup()
                let h = this.build()
                if ((et(h, this.cn("isDynamic"), !!l), c)) for (let r = 0; r < e; r++) h.append(this.createItem(r))
                let m,
                    a = 0
                for (let r of [...h.children]) {
                    let d = a === this.instance.page
                    d && (m = r),
                        et(r, this.cn("isCurrent"), d),
                        (t = r.children[0]) === null ||
                        t === void 0 ||
                        t.setAttribute("aria-selected", d ? "true" : "false")
                    for (let u of ["isBeforePrev", "isPrev", "isNext", "isAfterNext"]) Z(r, this.cn(u))
                    a++
                }
                if (((m = m || h.firstChild), l && m)) {
                    let r = m.previousElementSibling,
                        d = r && r.previousElementSibling
                    v(r, this.cn("isPrev")), v(d, this.cn("isBeforePrev"))
                    let u = m.nextElementSibling,
                        p = u && u.nextElementSibling
                    v(u, this.cn("isNext")), v(p, this.cn("isAfterNext"))
                }
                this.isDynamic = l
            }
            createItem(t = 0) {
                var e
                let n = document.createElement("li")
                n.setAttribute("role", "presentation")
                let i = tt(this.instance.localize(this.option("dotTpl"), [["%d", t + 1]]).replace(/\%i/g, t + ""))
                return (
                    n.appendChild(i), (e = n.children[0]) === null || e === void 0 || e.setAttribute("role", "tab"), n
                )
            }
            cleanup() {
                this.list && (this.list.remove(), (this.list = null)),
                    (this.isDynamic = false),
                    Z(this.instance.container, this.cn("hasDots"))
            }
            attach() {
                this.instance.on(["refresh", "change"], this.onRefresh)
            }
            detach() {
                this.instance.off(["refresh", "change"], this.onRefresh), this.cleanup()
            }
        }
    Object.defineProperty(be, "defaults", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: fa,
    })
    var se = "disabled",
        re = "next",
        Bi = "prev",
        ge = class extends A {
            constructor() {
                super(...arguments),
                    Object.defineProperty(this, "container", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: null,
                    }),
                    Object.defineProperty(this, "prev", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: null,
                    }),
                    Object.defineProperty(this, "next", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: null,
                    }),
                    Object.defineProperty(this, "isDom", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: false,
                    })
            }
            onRefresh() {
                let t = this.instance,
                    e = t.pages.length,
                    n = t.page
                if (e < 2) return void this.cleanup()
                this.build()
                let i = this.prev,
                    s = this.next
                i &&
                    s &&
                    (i.removeAttribute(se),
                        s.removeAttribute(se),
                        t.isInfinite || (n <= 0 && i.setAttribute(se, ""), n >= e - 1 && s.setAttribute(se, "")))
            }
            addBtn(t) {
                var e
                let n = this.instance,
                    i = document.createElement("button")
                i.setAttribute("tabindex", "0"),
                    i.setAttribute("title", n.localize(`{{${t.toUpperCase()}}}`)),
                    v(i, this.cn("button") + " " + this.cn(t === re ? "isNext" : "isPrev"))
                let s = n.isRTL ? (t === re ? Bi : re) : t
                var l
                return (
                    (i.innerHTML = n.localize(this.option(`${s}Tpl`))),
                    (i.dataset[
                        `carousel${((l = t), l ? (l.match("^[a-z]") ? l.charAt(0).toUpperCase() + l.substring(1) : l) : "")
                        }`
                    ] = "true"),
                    (e = this.container) === null || e === void 0 || e.appendChild(i),
                    i
                )
            }
            build() {
                let t = this.instance.container,
                    e = this.cn("container"),
                    { container: n, prev: i, next: s } = this
                n || ((n = t.querySelector("." + e)), (this.isDom = !!n)),
                    n || ((n = document.createElement("div")), v(n, e), t.appendChild(n)),
                    (this.container = n),
                    s || (s = n.querySelector("[data-carousel-next]")),
                    s || (s = this.addBtn(re)),
                    (this.next = s),
                    i || (i = n.querySelector("[data-carousel-prev]")),
                    i || (i = this.addBtn(Bi)),
                    (this.prev = i)
            }
            cleanup() {
                this.isDom ||
                    (this.prev && this.prev.remove(),
                        this.next && this.next.remove(),
                        this.container && this.container.remove()),
                    (this.prev = null),
                    (this.next = null),
                    (this.container = null),
                    (this.isDom = false)
            }
            attach() {
                this.instance.on(["refresh", "change"], this.onRefresh)
            }
            detach() {
                this.instance.off(["refresh", "change"], this.onRefresh), this.cleanup()
            }
        }
    Object.defineProperty(ge, "defaults", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: {
            classes: {
                container: "f-carousel__nav",
                button: "f-button",
                isNext: "is-next",
                isPrev: "is-prev",
            },
            nextTpl:
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M9 3l9 9-9 9"/></svg>',
            prevTpl:
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M15 3l-9 9 9 9"/></svg>',
        },
    })
    var Fe = class extends A {
        constructor() {
            super(...arguments),
                Object.defineProperty(this, "selectedIndex", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: null,
                }),
                Object.defineProperty(this, "target", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: null,
                }),
                Object.defineProperty(this, "nav", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: null,
                })
        }
        addAsTargetFor(t) {
            ; (this.target = this.instance), (this.nav = t), this.attachEvents()
        }
        addAsNavFor(t) {
            ; (this.nav = this.instance), (this.target = t), this.attachEvents()
        }
        attachEvents() {
            let { nav: t, target: e } = this
            t &&
                e &&
                ((t.options.initialSlide = e.options.initialPage),
                    t.state === D.Ready ? this.onNavReady(t) : t.on("ready", this.onNavReady),
                    e.state === D.Ready ? this.onTargetReady(e) : e.on("ready", this.onTargetReady))
        }
        onNavReady(t) {
            t.on("createSlide", this.onNavCreateSlide),
                t.on("Panzoom.click", this.onNavClick),
                t.on("Panzoom.touchEnd", this.onNavTouch),
                this.onTargetChange()
        }
        onTargetReady(t) {
            t.on("change", this.onTargetChange), t.on("Panzoom.refresh", this.onTargetChange), this.onTargetChange()
        }
        onNavClick(t, e, n) {
            this.onNavTouch(t, t.panzoom, n)
        }
        onNavTouch(t, e, n) {
            var i, s
            if (Math.abs(e.dragOffset.x) > 3 || Math.abs(e.dragOffset.y) > 3) return
            let l = n.target,
                { nav: c, target: h } = this
            if (!c || !h || !l) return
            let m = l.closest("[data-index]")
            if ((n.stopPropagation(), n.preventDefault(), !m)) return
            let a = parseInt(m.dataset.index || "", 10) || 0,
                r = h.getPageForSlide(a),
                d = c.getPageForSlide(a)
            c.slideTo(d),
                h.slideTo(r, {
                    friction:
                        ((s = (i = this.nav) === null || i === void 0 ? void 0 : i.plugins) === null || s === void 0
                            ? void 0
                            : s.Sync.option("friction")) || 0,
                }),
                this.markSelectedSlide(a)
        }
        onNavCreateSlide(t, e) {
            e.index === this.selectedIndex && this.markSelectedSlide(e.index)
        }
        onTargetChange() {
            var t, e
            let { target: n, nav: i } = this
            if (!n || !i || i.state !== D.Ready || n.state !== D.Ready) return
            let s =
                (e = (t = n.pages[n.page]) === null || t === void 0 ? void 0 : t.slides[0]) === null || e === void 0
                    ? void 0
                    : e.index,
                l = i.getPageForSlide(s)
            this.markSelectedSlide(s),
                i.slideTo(l, i.prevPage === null && n.prevPage === null ? { friction: 0 } : void 0)
        }
        markSelectedSlide(t) {
            let e = this.nav
            e &&
                e.state === D.Ready &&
                ((this.selectedIndex = t),
                    [...e.slides].map(n => {
                        n.el && n.el.classList[n.index === t ? "add" : "remove"]("is-nav-selected")
                    }))
        }
        attach() {
            let t = this,
                e = t.options.target,
                n = t.options.nav
            e ? t.addAsNavFor(e) : n && t.addAsTargetFor(n)
        }
        detach() {
            let t = this,
                e = t.nav,
                n = t.target
            e &&
                (e.off("ready", t.onNavReady),
                    e.off("createSlide", t.onNavCreateSlide),
                    e.off("Panzoom.click", t.onNavClick),
                    e.off("Panzoom.touchEnd", t.onNavTouch)),
                (t.nav = null),
                n &&
                (n.off("ready", t.onTargetReady),
                    n.off("refresh", t.onTargetChange),
                    n.off("change", t.onTargetChange)),
                (t.target = null)
        }
    }
    Object.defineProperty(Fe, "defaults", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: { friction: 0.35 },
    })
    var Qa = { Navigation: ge, Dots: be, Sync: Fe },
        le = "animationend",
        Ui = "isSelected",
        ce = "slide",
        vt = class o extends Ot {
            get axis() {
                return this.isHorizontal ? "e" : "f"
            }
            get isEnabled() {
                return this.state === D.Ready
            }
            get isInfinite() {
                let t = false,
                    { contentDim: e, viewportDim: n, pages: i, slides: s } = this,
                    l = s[0]
                return i.length >= 2 && l && e + l.dim >= n && (t = this.option("infinite")), t
            }
            get isRTL() {
                return this.option("direction") === "rtl"
            }
            get isHorizontal() {
                return this.option("axis") === "x"
            }
            constructor(t, e = {}, n = {}) {
                if (
                    (super(),
                        Object.defineProperty(this, "bp", {
                            enumerable: true,
                            configurable: true,
                            writable: true,
                            value: "",
                        }),
                        Object.defineProperty(this, "lp", {
                            enumerable: true,
                            configurable: true,
                            writable: true,
                            value: 0,
                        }),
                        Object.defineProperty(this, "userOptions", {
                            enumerable: true,
                            configurable: true,
                            writable: true,
                            value: {},
                        }),
                        Object.defineProperty(this, "userPlugins", {
                            enumerable: true,
                            configurable: true,
                            writable: true,
                            value: {},
                        }),
                        Object.defineProperty(this, "state", {
                            enumerable: true,
                            configurable: true,
                            writable: true,
                            value: D.Init,
                        }),
                        Object.defineProperty(this, "page", {
                            enumerable: true,
                            configurable: true,
                            writable: true,
                            value: 0,
                        }),
                        Object.defineProperty(this, "prevPage", {
                            enumerable: true,
                            configurable: true,
                            writable: true,
                            value: null,
                        }),
                        Object.defineProperty(this, "container", {
                            enumerable: true,
                            configurable: true,
                            writable: true,
                            value: void 0,
                        }),
                        Object.defineProperty(this, "viewport", {
                            enumerable: true,
                            configurable: true,
                            writable: true,
                            value: null,
                        }),
                        Object.defineProperty(this, "track", {
                            enumerable: true,
                            configurable: true,
                            writable: true,
                            value: null,
                        }),
                        Object.defineProperty(this, "slides", {
                            enumerable: true,
                            configurable: true,
                            writable: true,
                            value: [],
                        }),
                        Object.defineProperty(this, "pages", {
                            enumerable: true,
                            configurable: true,
                            writable: true,
                            value: [],
                        }),
                        Object.defineProperty(this, "panzoom", {
                            enumerable: true,
                            configurable: true,
                            writable: true,
                            value: null,
                        }),
                        Object.defineProperty(this, "inTransition", {
                            enumerable: true,
                            configurable: true,
                            writable: true,
                            value: new Set(),
                        }),
                        Object.defineProperty(this, "contentDim", {
                            enumerable: true,
                            configurable: true,
                            writable: true,
                            value: 0,
                        }),
                        Object.defineProperty(this, "viewportDim", {
                            enumerable: true,
                            configurable: true,
                            writable: true,
                            value: 0,
                        }),
                        typeof t == "string" && (t = document.querySelector(t)),
                        !t || !N(t))
                )
                    throw new Error("No Element found")
                    ; (this.container = t),
                        (this.slideNext = gi(this.slideNext.bind(this), 150)),
                        (this.slidePrev = gi(this.slidePrev.bind(this), 150)),
                        (this.userOptions = e),
                        (this.userPlugins = n),
                        queueMicrotask(() => {
                            this.processOptions()
                        })
            }
            processOptions() {
                var t, e
                let n = X({}, o.defaults, this.userOptions),
                    i = "",
                    s = n.breakpoints
                if (s && Wn(s))
                    for (let [l, c] of Object.entries(s)) window.matchMedia(l).matches && Wn(c) && ((i += l), X(n, c))
                        ; (i === this.bp && this.state !== D.Init) ||
                            ((this.bp = i),
                                this.state === D.Ready &&
                                (n.initialSlide =
                                    ((e = (t = this.pages[this.page]) === null || t === void 0 ? void 0 : t.slides[0]) ===
                                        null || e === void 0
                                        ? void 0
                                        : e.index) || 0),
                                this.state !== D.Init && this.destroy(),
                                super.setOptions(n),
                                this.option("enabled") === false
                                    ? this.attachEvents()
                                    : setTimeout(() => {
                                        this.init()
                                    }, 0))
            }
            init() {
                ; (this.state = D.Init),
                    this.emit("init"),
                    this.attachPlugins(Object.assign(Object.assign({}, o.Plugins), this.userPlugins)),
                    this.emit("attachPlugins"),
                    this.initLayout(),
                    this.initSlides(),
                    this.updateMetrics(),
                    this.setInitialPosition(),
                    this.initPanzoom(),
                    this.attachEvents(),
                    (this.state = D.Ready),
                    this.emit("ready")
            }
            initLayout() {
                let { container: t } = this,
                    e = this.option("classes")
                v(t, this.cn("container")),
                    et(t, e.isLTR, !this.isRTL),
                    et(t, e.isRTL, this.isRTL),
                    et(t, e.isVertical, !this.isHorizontal),
                    et(t, e.isHorizontal, this.isHorizontal)
                let n = this.option("viewport") || t.querySelector(`.${e.viewport}`)
                n ||
                    ((n = document.createElement("div")),
                        v(n, e.viewport),
                        n.append(...Fi(t, `.${e.slide}`)),
                        t.prepend(n)),
                    n.addEventListener("scroll", this.onScroll)
                let i = this.option("track") || t.querySelector(`.${e.track}`)
                i || ((i = document.createElement("div")), v(i, e.track), i.append(...Array.from(n.childNodes))),
                    i.setAttribute("aria-live", "polite"),
                    n.contains(i) || n.prepend(i),
                    (this.viewport = n),
                    (this.track = i),
                    this.emit("initLayout")
            }
            initSlides() {
                let { track: t } = this
                if (!t) return
                let e = [...this.slides],
                    n = []
                    ;[...Fi(t, `.${this.cn(ce)}`)].forEach(i => {
                        if (N(i)) {
                            let s = un({ el: i, isDom: true, index: this.slides.length })
                            n.push(s)
                        }
                    })
                for (let i of [...(this.option("slides", []) || []), ...e]) n.push(un(i))
                this.slides = n
                for (let i = 0; i < this.slides.length; i++) this.slides[i].index = i
                for (let i of n) this.emit("beforeInitSlide", i, i.index), this.emit("initSlide", i, i.index)
                this.emit("initSlides")
            }
            setInitialPage() {
                let t = this.option("initialSlide")
                this.page =
                    typeof t == "number"
                        ? this.getPageForSlide(t)
                        : parseInt(this.option("initialPage", 0) + "", 10) || 0
            }
            setInitialPosition() {
                let { track: t, pages: e, isHorizontal: n } = this
                if (!t || !e.length) return
                let i = this.page
                e[i] || (this.page = i = 0)
                let s = (e[i].pos || 0) * (this.isRTL && n ? 1 : -1),
                    l = n ? `${s}px` : "0",
                    c = n ? "0" : `${s}px`
                    ; (t.style.transform = `translate3d(${l}, ${c}, 0) scale(1)`),
                        this.option("adaptiveHeight") && this.setViewportHeight()
            }
            initPanzoom() {
                this.panzoom && (this.panzoom.destroy(), (this.panzoom = null))
                let t = this.option("Panzoom") || {}
                    ; (this.panzoom = new Qt(
                        this.viewport,
                        X(
                            {},
                            {
                                content: this.track,
                                zoom: false,
                                panOnlyZoomed: false,
                                lockAxis: this.isHorizontal ? "x" : "y",
                                infinite: this.isInfinite,
                                click: false,
                                dblClick: false,
                                touch: e => !(this.pages.length < 2 && !e.options.infinite),
                                bounds: () => this.getBounds(),
                                maxVelocity: e =>
                                    Math.abs(e.target[this.axis] - e.current[this.axis]) < 2 * this.viewportDim ? 100 : 0,
                            },
                            t
                        )
                    )),
                        this.panzoom.on("*", (e, n, ...i) => {
                            this.emit(`Panzoom.${n}`, e, ...i)
                        }),
                        this.panzoom.on("decel", this.onDecel),
                        this.panzoom.on("refresh", this.onRefresh),
                        this.panzoom.on("beforeTransform", this.onBeforeTransform),
                        this.panzoom.on("endAnimation", this.onEndAnimation)
            }
            attachEvents() {
                let t = this.container
                t &&
                    (t.addEventListener("click", this.onClick, {
                        passive: false,
                        capture: false,
                    }),
                        t.addEventListener("slideTo", this.onSlideTo)),
                    window.addEventListener("resize", this.onResize)
            }
            createPages() {
                let t = [],
                    { contentDim: e, viewportDim: n } = this,
                    i = this.option("slidesPerPage")
                i = (i === "auto" || e <= n) && this.option("fill") !== false ? 1 / 0 : parseFloat(i + "")
                let s = 0,
                    l = 0,
                    c = 0
                for (let h of this.slides)
                    (!t.length || l + h.dim - n > 0.05 || c >= i) &&
                        (t.push(pa()), (s = t.length - 1), (l = 0), (c = 0)),
                        t[s].slides.push(h),
                        (l += h.dim + h.gap),
                        c++
                return t
            }
            processPages() {
                let t = this.pages,
                    { contentDim: e, viewportDim: n, isInfinite: i } = this,
                    s = this.option("center"),
                    l = this.option("fill"),
                    c = l && s && e > n && !i
                if (
                    (t.forEach((a, r) => {
                        var d
                            ; (a.index = r),
                                (a.pos = ((d = a.slides[0]) === null || d === void 0 ? void 0 : d.pos) || 0),
                                (a.dim = 0)
                        for (let [u, p] of a.slides.entries())
                            (a.dim += p.dim), u < a.slides.length - 1 && (a.dim += p.gap)
                        c && a.pos + 0.5 * a.dim < 0.5 * n
                            ? (a.pos = 0)
                            : c && a.pos + 0.5 * a.dim >= e - 0.5 * n
                                ? (a.pos = e - n)
                                : s && (a.pos += -0.5 * (n - a.dim))
                    }),
                        t.forEach(a => {
                            l && !i && e > n && ((a.pos = Math.max(a.pos, 0)), (a.pos = Math.min(a.pos, e - n))),
                                (a.pos = F(a.pos, 1e3)),
                                (a.dim = F(a.dim, 1e3)),
                                Math.abs(a.pos) <= 0.1 && (a.pos = 0)
                        }),
                        i)
                )
                    return t
                let h = [],
                    m
                return (
                    t.forEach(a => {
                        let r = Object.assign({}, a)
                        m && r.pos === m.pos
                            ? ((m.dim += r.dim), (m.slides = [...m.slides, ...r.slides]))
                            : ((r.index = h.length), (m = r), h.push(r))
                    }),
                    h
                )
            }
            getPageFromIndex(t = 0) {
                let e = this.pages.length,
                    n
                return (
                    (t = parseInt((t || 0).toString()) || 0),
                    (n = this.isInfinite ? ((t % e) + e) % e : Math.max(Math.min(t, e - 1), 0)),
                    n
                )
            }
            getSlideMetrics(t) {
                var e, n
                let i = this.isHorizontal ? "width" : "height",
                    s = 0,
                    l = 0,
                    c = t.el,
                    h = !(!c || c.parentNode)
                if (
                    (c
                        ? (s = parseFloat(c.dataset[i] || "") || 0)
                        : ((c = document.createElement("div")),
                            (c.style.visibility = "hidden"),
                            (this.track || document.body).prepend(c)),
                        v(c, this.cn(ce) + " " + t.class + " " + t.customClass),
                        s)
                )
                    (c.style[i] = `${s}px`), (c.style[i === "width" ? "height" : "width"] = "")
                else {
                    h && (this.track || document.body).prepend(c),
                        (s =
                            c.getBoundingClientRect()[i] *
                            Math.max(1, ((e = window.visualViewport) === null || e === void 0 ? void 0 : e.scale) || 1))
                    let a = c[this.isHorizontal ? "offsetWidth" : "offsetHeight"]
                    a - 1 > s && (s = a)
                }
                let m = getComputedStyle(c)
                return (
                    m.boxSizing === "content-box" &&
                    (this.isHorizontal
                        ? ((s += parseFloat(m.paddingLeft) || 0), (s += parseFloat(m.paddingRight) || 0))
                        : ((s += parseFloat(m.paddingTop) || 0), (s += parseFloat(m.paddingBottom) || 0))),
                    (l = parseFloat(m[this.isHorizontal ? "marginRight" : "marginBottom"]) || 0),
                    h ? (n = c.parentElement) === null || n === void 0 || n.removeChild(c) : t.el || c.remove(),
                    { dim: F(s, 1e3), gap: F(l, 1e3) }
                )
            }
            getBounds() {
                let { isInfinite: t, isRTL: e, isHorizontal: n, pages: i } = this,
                    s = { min: 0, max: 0 }
                if (t) s = { min: -1 / 0, max: 1 / 0 }
                else if (i.length) {
                    let l = i[0].pos,
                        c = i[i.length - 1].pos
                    s = e && n ? { min: l, max: c } : { min: -1 * c, max: -1 * l }
                }
                return { x: n ? s : { min: 0, max: 0 }, y: n ? { min: 0, max: 0 } : s }
            }
            repositionSlides() {
                let t,
                    {
                        isHorizontal: e,
                        isRTL: n,
                        isInfinite: i,
                        viewport: s,
                        viewportDim: l,
                        contentDim: c,
                        page: h,
                        pages: m,
                        slides: a,
                        panzoom: r,
                    } = this,
                    d = 0,
                    u = 0,
                    p = 0,
                    f = 0
                r ? (f = -1 * r.current[this.axis]) : m[h] && (f = m[h].pos || 0),
                    (t = e ? (n ? "right" : "left") : "top"),
                    n && e && (f *= -1)
                for (let B of a) {
                    let x = B.el
                    x
                        ? (t === "top" ? ((x.style.right = ""), (x.style.left = "")) : (x.style.top = ""),
                            B.index !== d ? (x.style[t] = u === 0 ? "" : `${F(u, 1e3)}px`) : (x.style[t] = ""),
                            (p += B.dim + B.gap),
                            d++)
                        : (u += B.dim + B.gap)
                }
                if (i && p && s) {
                    let B = getComputedStyle(s),
                        x = "padding",
                        E = e ? "Right" : "Bottom",
                        W = parseFloat(B[x + (e ? "Left" : "Top")])
                        ; (f -= W), (l += W), (l += parseFloat(B[x + E]))
                    for (let y of a)
                        y.el &&
                            (F(y.pos) < F(l) &&
                                F(y.pos + y.dim + y.gap) < F(f) &&
                                F(f) > F(c - l) &&
                                (y.el.style[t] = `${F(u + p, 1e3)}px`),
                                F(y.pos + y.gap) >= F(c - l) &&
                                F(y.pos) > F(f + l) &&
                                F(f) < F(l) &&
                                (y.el.style[t] = `-${F(p, 1e3)}px`))
                }
                let Q,
                    b,
                    g = [...this.inTransition]
                if ((g.length > 1 && ((Q = m[g[0]]), (b = m[g[1]])), Q && b)) {
                    let B = 0
                    for (let x of a)
                        x.el
                            ? this.inTransition.has(x.index) &&
                            Q.slides.indexOf(x) < 0 &&
                            (x.el.style[t] = `${F(B + (Q.pos - b.pos), 1e3)}px`)
                            : (B += x.dim + x.gap)
                }
            }
            createSlideEl(t) {
                let { track: e, slides: n } = this
                if (!e || !t || (t.el && t.el.parentNode)) return
                let i = t.el || document.createElement("div")
                v(i, this.cn(ce)), v(i, t.class), v(i, t.customClass)
                let s = t.html
                s && (s instanceof HTMLElement ? i.appendChild(s) : (i.innerHTML = t.html + ""))
                let l = []
                n.forEach((a, r) => {
                    a.el && l.push(r)
                })
                let c = t.index,
                    h = null
                l.length && (h = n[l.reduce((a, r) => (Math.abs(r - c) < Math.abs(a - c) ? r : a))])
                let m = h && h.el && h.el.parentNode ? (h.index < t.index ? h.el.nextSibling : h.el) : null
                e.insertBefore(i, e.contains(m) ? m : null), (t.el = i), this.emit("createSlide", t)
            }
            removeSlideEl(t, e = false) {
                let n = t?.el
                if (!n || !n.parentNode) return
                let i = this.cn(Ui)
                if ((n.classList.contains(i) && (Z(n, i), this.emit("unselectSlide", t)), t.isDom && !e))
                    return n.removeAttribute("aria-hidden"), n.removeAttribute("data-index"), void (n.style.left = "")
                this.emit("removeSlide", t)
                let s = new CustomEvent(le)
                n.dispatchEvent(s), t.el && (t.el.remove(), (t.el = null))
            }
            transitionTo(t = 0, e = this.option("transition")) {
                var n, i, s, l
                if (!e) return false
                let c = this.page,
                    { pages: h, panzoom: m } = this
                t = parseInt((t || 0).toString()) || 0
                let a = this.getPageFromIndex(t)
                if (
                    !m ||
                    !h[a] ||
                    h.length < 2 ||
                    Math.abs(
                        (((i = (n = h[c]) === null || n === void 0 ? void 0 : n.slides[0]) === null || i === void 0
                            ? void 0
                            : i.dim) || 0) - this.viewportDim
                    ) > 1
                )
                    return false
                let r = t > c ? 1 : -1
                this.isInfinite && (c === 0 && t === h.length - 1 && (r = -1), c === h.length - 1 && t === 0 && (r = 1))
                let d = h[a].pos * (this.isRTL ? 1 : -1)
                if (c === a && Math.abs(d - m.target[this.axis]) < 1) return false
                this.clearTransitions()
                let u = m.isResting
                v(this.container, this.cn("inTransition"))
                let p = ((s = h[c]) === null || s === void 0 ? void 0 : s.slides[0]) || null,
                    f = ((l = h[a]) === null || l === void 0 ? void 0 : l.slides[0]) || null
                this.inTransition.add(f.index), this.createSlideEl(f)
                let Q = p.el,
                    b = f.el
                u || e === ce || ((e = "fadeFast"), (Q = null))
                let g = this.isRTL ? "next" : "prev",
                    B = this.isRTL ? "prev" : "next"
                return (
                    Q &&
                    (this.inTransition.add(p.index),
                        (p.transition = e),
                        Q.addEventListener(le, this.onAnimationEnd),
                        Q.classList.add(`f-${e}Out`, `to-${r > 0 ? B : g}`)),
                    b &&
                    ((f.transition = e),
                        b.addEventListener(le, this.onAnimationEnd),
                        b.classList.add(`f-${e}In`, `from-${r > 0 ? g : B}`)),
                    (m.current[this.axis] = d),
                    (m.target[this.axis] = d),
                    m.requestTick(),
                    this.onChange(a),
                    true
                )
            }
            manageSlideVisiblity() {
                let t = new Set(),
                    e = new Set(),
                    n = this.getVisibleSlides(parseFloat(this.option("preload", 0) + "") || 0)
                for (let i of this.slides) n.has(i) ? t.add(i) : e.add(i)
                for (let i of this.inTransition) t.add(this.slides[i])
                for (let i of t) this.createSlideEl(i), this.lazyLoadSlide(i)
                for (let i of e) t.has(i) || this.removeSlideEl(i)
                this.markSelectedSlides(), this.repositionSlides()
            }
            markSelectedSlides() {
                if (!this.pages[this.page] || !this.pages[this.page].slides) return
                let t = "aria-hidden",
                    e = this.cn(Ui)
                if (e)
                    for (let n of this.slides) {
                        let i = n.el
                        i &&
                            ((i.dataset.index = `${n.index}`),
                                i.classList.contains("f-thumbs__slide")
                                    ? this.getVisibleSlides(0).has(n)
                                        ? i.removeAttribute(t)
                                        : i.setAttribute(t, "true")
                                    : this.pages[this.page].slides.includes(n)
                                        ? (i.classList.contains(e) || (v(i, e), this.emit("selectSlide", n)),
                                            i.removeAttribute(t))
                                        : (i.classList.contains(e) && (Z(i, e), this.emit("unselectSlide", n)),
                                            i.setAttribute(t, "true")))
                    }
            }
            flipInfiniteTrack() {
                let { axis: t, isHorizontal: e, isInfinite: n, isRTL: i, viewportDim: s, contentDim: l } = this,
                    c = this.panzoom
                if (!c || !n) return
                let h = c.current[t],
                    m = c.target[t] - h,
                    a = 0,
                    r = 0.5 * s
                i && e
                    ? (h < -r && ((a = -1), (h += l)), h > l - r && ((a = 1), (h -= l)))
                    : (h > r && ((a = 1), (h -= l)), h < -l + r && ((a = -1), (h += l))),
                    a && ((c.current[t] = h), (c.target[t] = h + m))
            }
            lazyLoadImg(t, e) {
                let n = this,
                    i = "f-fadeIn",
                    s = "is-preloading",
                    l = false,
                    c = null,
                    h = () => {
                        l ||
                            ((l = true),
                                c && (c.remove(), (c = null)),
                                Z(e, s),
                                e.complete &&
                                (v(e, i),
                                    setTimeout(() => {
                                        Z(e, i)
                                    }, 350)),
                                this.option("adaptiveHeight") &&
                                t.el &&
                                this.pages[this.page].slides.indexOf(t) > -1 &&
                                (n.updateMetrics(), n.setViewportHeight()),
                                this.emit("load", t))
                    }
                v(e, s),
                    (e.src = e.dataset.lazySrcset || e.dataset.lazySrc || ""),
                    delete e.dataset.lazySrc,
                    delete e.dataset.lazySrcset,
                    e.addEventListener("error", () => {
                        h()
                    }),
                    e.addEventListener("load", () => {
                        h()
                    }),
                    setTimeout(() => {
                        let m = e.parentNode
                        m && t.el && (e.complete ? h() : l || ((c = tt(Rn)), m.insertBefore(c, e)))
                    }, 300)
            }
            lazyLoadSlide(t) {
                let e = t && t.el
                if (!e) return
                let n = new Set(),
                    i = Array.from(e.querySelectorAll("[data-lazy-src],[data-lazy-srcset]"))
                e.dataset.lazySrc && i.push(e),
                    i.map(s => {
                        s instanceof HTMLImageElement
                            ? n.add(s)
                            : s instanceof HTMLElement &&
                            s.dataset.lazySrc &&
                            ((s.style.backgroundImage = `url('${s.dataset.lazySrc}')`), delete s.dataset.lazySrc)
                    })
                for (let s of n) this.lazyLoadImg(t, s)
            }
            onAnimationEnd(t) {
                var e
                let n = t.target,
                    i = n ? parseInt(n.dataset.index || "", 10) || 0 : -1,
                    s = this.slides[i],
                    l = t.animationName
                if (!n || !s || !l) return
                let c = !!this.inTransition.has(i) && s.transition
                c && l.substring(0, c.length + 2) === `f-${c}` && this.inTransition.delete(i),
                    this.inTransition.size || this.clearTransitions(),
                    i === this.page &&
                    !((e = this.panzoom) === null || e === void 0) &&
                    e.isResting &&
                    this.emit("settle")
            }
            onDecel(t, e = 0, n = 0, i = 0, s = 0) {
                if (this.option("dragFree")) return void this.setPageFromPosition()
                let { isRTL: l, isHorizontal: c, axis: h, pages: m } = this,
                    a = m.length,
                    r = Math.abs(Math.atan2(n, e) / (Math.PI / 180)),
                    d = 0
                if (((d = r > 45 && r < 135 ? (c ? 0 : n) : c ? e : 0), !a)) return
                let u = this.page,
                    p = l && c ? 1 : -1,
                    f = t.current[h] * p,
                    { pageIndex: Q } = this.getPageFromPosition(f)
                Math.abs(d) > 5
                    ? (m[u].dim < document.documentElement["client" + (this.isHorizontal ? "Width" : "Height")] - 1 &&
                        (u = Q),
                        (u = l && c ? (d < 0 ? u - 1 : u + 1) : d < 0 ? u + 1 : u - 1))
                    : (u = i === 0 && s === 0 ? u : Q),
                    this.slideTo(u, {
                        transition: false,
                        friction: t.option("decelFriction"),
                    })
            }
            onClick(t) {
                let e = t.target,
                    n = e && N(e) ? e.dataset : null,
                    i,
                    s
                n &&
                    (n.carouselPage !== void 0
                        ? ((s = "slideTo"), (i = n.carouselPage))
                        : n.carouselNext !== void 0
                            ? (s = "slideNext")
                            : n.carouselPrev !== void 0 && (s = "slidePrev")),
                    s
                        ? (t.preventDefault(), t.stopPropagation(), e && !e.hasAttribute("disabled") && this[s](i))
                        : this.emit("click", t)
            }
            onSlideTo(t) {
                let e = t.detail || 0
                this.slideTo(this.getPageForSlide(e), { friction: 0 })
            }
            onChange(t, e = 0) {
                let n = this.page
                    ; (this.prevPage = n),
                        (this.page = t),
                        this.option("adaptiveHeight") && this.setViewportHeight(),
                        t !== n && (this.markSelectedSlides(), this.emit("change", t, n, e))
            }
            onRefresh() {
                let t = this.contentDim,
                    e = this.viewportDim
                this.updateMetrics(),
                    (this.contentDim === t && this.viewportDim === e) ||
                    this.slideTo(this.page, { friction: 0, transition: false })
            }
            onScroll() {
                var t
                    ; (t = this.viewport) === null || t === void 0 || t.scroll(0, 0)
            }
            onResize() {
                this.option("breakpoints") && this.processOptions()
            }
            onBeforeTransform(t) {
                this.lp !== t.current[this.axis] && (this.flipInfiniteTrack(), this.manageSlideVisiblity()),
                    (this.lp = t.current.e)
            }
            onEndAnimation() {
                this.inTransition.size || this.emit("settle")
            }
            reInit(t = null, e = null) {
                this.destroy(),
                    (this.state = D.Init),
                    (this.prevPage = null),
                    (this.userOptions = t || this.userOptions),
                    (this.userPlugins = e || this.userPlugins),
                    this.processOptions()
            }
            slideTo(t = 0, { friction: e = this.option("friction"), transition: n = this.option("transition") } = {}) {
                if (this.state === D.Destroy) return
                t = parseInt((t || 0).toString()) || 0
                let i = this.getPageFromIndex(t),
                    { axis: s, isHorizontal: l, isRTL: c, pages: h, panzoom: m } = this,
                    a = h.length,
                    r = c && l ? 1 : -1
                if (!m || !a) return
                if (this.page !== i) {
                    let u = new Event("beforeChange", { bubbles: true, cancelable: true })
                    if ((this.emit("beforeChange", u, t), u.defaultPrevented)) return
                }
                if (this.transitionTo(t, n)) return
                let d = h[i].pos
                if (this.isInfinite) {
                    let u = this.contentDim,
                        p = m.target[s] * r
                    a === 2
                        ? (d += u * Math.floor(parseFloat(t + "") / 2))
                        : (d = [d, d - u, d + u].reduce(function (f, Q) {
                            return Math.abs(Q - p) < Math.abs(f - p) ? Q : f
                        }))
                }
                ; (d *= r),
                    Math.abs(m.target[s] - d) < 1 ||
                    (m.panTo({ x: l ? d : 0, y: l ? 0 : d, friction: e }), this.onChange(i))
            }
            slideToClosest(t) {
                if (this.panzoom) {
                    let { pageIndex: e } = this.getPageFromPosition()
                    this.slideTo(e, t)
                }
            }
            slideNext() {
                this.slideTo(this.page + 1)
            }
            slidePrev() {
                this.slideTo(this.page - 1)
            }
            clearTransitions() {
                this.inTransition.clear(), Z(this.container, this.cn("inTransition"))
                let t = ["to-prev", "to-next", "from-prev", "from-next"]
                for (let e of this.slides) {
                    let n = e.el
                    if (n) {
                        n.removeEventListener(le, this.onAnimationEnd), n.classList.remove(...t)
                        let i = e.transition
                        i && n.classList.remove(`f-${i}Out`, `f-${i}In`)
                    }
                }
                this.manageSlideVisiblity()
            }
            addSlide(t, e) {
                var n, i, s, l
                let c = this.panzoom,
                    h = ((n = this.pages[this.page]) === null || n === void 0 ? void 0 : n.pos) || 0,
                    m = ((i = this.pages[this.page]) === null || i === void 0 ? void 0 : i.dim) || 0,
                    a = this.contentDim < this.viewportDim,
                    r = Array.isArray(e) ? e : [e],
                    d = []
                for (let u of r) d.push(un(u))
                this.slides.splice(t, 0, ...d)
                for (let u = 0; u < this.slides.length; u++) this.slides[u].index = u
                for (let u of d) this.emit("beforeInitSlide", u, u.index)
                if ((this.page >= t && (this.page += d.length), this.updateMetrics(), c)) {
                    let u = ((s = this.pages[this.page]) === null || s === void 0 ? void 0 : s.pos) || 0,
                        p = ((l = this.pages[this.page]) === null || l === void 0 ? void 0 : l.dim) || 0,
                        f = this.pages.length || 1,
                        Q = this.isRTL ? m - p : p - m,
                        b = this.isRTL ? h - u : u - h
                    a && f === 1
                        ? (t <= this.page && ((c.current[this.axis] -= Q), (c.target[this.axis] -= Q)),
                            c.panTo({ [this.isHorizontal ? "x" : "y"]: -1 * u }))
                        : b &&
                        t <= this.page &&
                        ((c.target[this.axis] -= b), (c.current[this.axis] -= b), c.requestTick())
                }
                for (let u of d) this.emit("initSlide", u, u.index)
            }
            prependSlide(t) {
                this.addSlide(0, t)
            }
            appendSlide(t) {
                this.addSlide(this.slides.length, t)
            }
            removeSlide(t) {
                let e = this.slides.length
                t = ((t % e) + e) % e
                let n = this.slides[t]
                if (n) {
                    this.removeSlideEl(n, true), this.slides.splice(t, 1)
                    for (let i = 0; i < this.slides.length; i++) this.slides[i].index = i
                    this.updateMetrics(),
                        this.slideTo(this.page, { friction: 0, transition: false }),
                        this.emit("destroySlide", n)
                }
            }
            updateMetrics() {
                let { panzoom: t, viewport: e, track: n, slides: i, isHorizontal: s, isInfinite: l } = this
                if (!n) return
                let c = s ? "width" : "height",
                    h = s ? "offsetWidth" : "offsetHeight"
                if (e) {
                    let r = Math.max(e[h], F(e.getBoundingClientRect()[c], 1e3)),
                        d = getComputedStyle(e),
                        u = "padding",
                        p = s ? "Right" : "Bottom"
                        ; (r -= parseFloat(d[u + (s ? "Left" : "Top")]) + parseFloat(d[u + p])), (this.viewportDim = r)
                }
                let m,
                    a = 0
                for (let [r, d] of i.entries()) {
                    let u = 0,
                        p = 0
                    !d.el && m ? ((u = m.dim), (p = m.gap)) : (({ dim: u, gap: p } = this.getSlideMetrics(d)), (m = d)),
                        (u = F(u, 1e3)),
                        (p = F(p, 1e3)),
                        (d.dim = u),
                        (d.gap = p),
                        (d.pos = a),
                        (a += u),
                        (l || r < i.length - 1) && (a += p)
                }
                ; (a = F(a, 1e3)),
                    (this.contentDim = a),
                    t && ((t.contentRect[c] = a), (t.contentRect[s ? "fullWidth" : "fullHeight"] = a)),
                    (this.pages = this.createPages()),
                    (this.pages = this.processPages()),
                    this.state === D.Init && this.setInitialPage(),
                    (this.page = Math.max(0, Math.min(this.page, this.pages.length - 1))),
                    this.manageSlideVisiblity(),
                    this.emit("refresh")
            }
            getProgress(t, e = false, n = false) {
                t === void 0 && (t = this.page)
                let i = this,
                    s = i.panzoom,
                    l = i.contentDim,
                    c = i.pages[t] || 0
                if (!c || !s) return t > this.page ? -1 : 1
                let h = -1 * s.current.e,
                    m = F((h - c.pos) / (1 * c.dim), 1e3),
                    a = m,
                    r = m
                this.isInfinite &&
                    n !== true &&
                    ((a = F((h - c.pos + l) / (1 * c.dim), 1e3)), (r = F((h - c.pos - l) / (1 * c.dim), 1e3)))
                let d = [m, a, r].reduce(function (u, p) {
                    return Math.abs(p) < Math.abs(u) ? p : u
                })
                return e ? d : d > 1 ? 1 : d < -1 ? -1 : d
            }
            setViewportHeight() {
                let { page: t, pages: e, viewport: n, isHorizontal: i } = this
                if (!n || !e[t]) return
                let s = 0
                i &&
                    this.track &&
                    ((this.track.style.height = "auto"),
                        e[t].slides.forEach(l => {
                            l.el && (s = Math.max(s, l.el.offsetHeight))
                        })),
                    (n.style.height = s ? `${s}px` : "")
            }
            getPageForSlide(t) {
                for (let e of this.pages) for (let n of e.slides) if (n.index === t) return e.index
                return -1
            }
            getVisibleSlides(t = 0) {
                var e
                let n = new Set(),
                    { panzoom: i, contentDim: s, viewportDim: l, pages: c, page: h } = this
                if (l) {
                    s = s + ((e = this.slides[this.slides.length - 1]) === null || e === void 0 ? void 0 : e.gap) || 0
                    let m = 0
                        ; (m =
                            i && i.state !== O.Init && i.state !== O.Destroy
                                ? -1 * i.current[this.axis]
                                : (c[h] && c[h].pos) || 0),
                            this.isInfinite && (m -= Math.floor(m / s) * s),
                            this.isRTL && this.isHorizontal && (m *= -1)
                    let a = m - l * t,
                        r = m + l * (t + 1),
                        d = this.isInfinite ? [-1, 0, 1] : [0]
                    for (let u of this.slides)
                        for (let p of d) {
                            let f = u.pos + p * s,
                                Q = f + u.dim + u.gap
                            f < r && Q > a && n.add(u)
                        }
                }
                return n
            }
            getPageFromPosition(t) {
                let { viewportDim: e, contentDim: n, slides: i, pages: s, panzoom: l } = this,
                    c = s.length,
                    h = i.length,
                    m = i[0],
                    a = i[h - 1],
                    r = this.option("center"),
                    d = 0,
                    u = 0,
                    p = 0,
                    f = t === void 0 ? -1 * (l?.target[this.axis] || 0) : t
                r && (f += 0.5 * e),
                    this.isInfinite
                        ? (f < m.pos - 0.5 * a.gap && ((f -= n), (p = -1)),
                            f > a.pos + a.dim + 0.5 * a.gap && ((f -= n), (p = 1)))
                        : (f = Math.max(m.pos || 0, Math.min(f, a.pos)))
                let Q = a,
                    b = i.find(g => {
                        let B = g.pos - 0.5 * Q.gap,
                            x = g.pos + g.dim + 0.5 * g.gap
                        return (Q = g), f >= B && f < x
                    })
                return b || (b = a), (u = this.getPageForSlide(b.index)), (d = u + p * c), { page: d, pageIndex: u }
            }
            setPageFromPosition() {
                let { pageIndex: t } = this.getPageFromPosition()
                this.onChange(t)
            }
            destroy() {
                if ([D.Destroy].includes(this.state)) return
                this.state = D.Destroy
                let { container: t, viewport: e, track: n, slides: i, panzoom: s } = this,
                    l = this.option("classes")
                t.removeEventListener("click", this.onClick, {
                    passive: false,
                    capture: false,
                }),
                    t.removeEventListener("slideTo", this.onSlideTo),
                    window.removeEventListener("resize", this.onResize),
                    s && (s.destroy(), (this.panzoom = null)),
                    i &&
                    i.forEach(h => {
                        this.removeSlideEl(h)
                    }),
                    this.detachPlugins(),
                    e &&
                    (e.removeEventListener("scroll", this.onScroll),
                        e.offsetParent && n && n.offsetParent && e.replaceWith(...n.childNodes))
                for (let [h, m] of Object.entries(l)) h !== "container" && m && t.classList.remove(m)
                    ; (this.track = null), (this.viewport = null), (this.page = 0), (this.slides = [])
                let c = this.events.get("ready")
                    ; (this.events = new Map()), c && this.events.set("ready", c)
            }
        }
    Object.defineProperty(vt, "Panzoom", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: Qt,
    }),
        Object.defineProperty(vt, "defaults", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ma,
        }),
        Object.defineProperty(vt, "Plugins", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: Qa,
        })
    var Xi = function (o) {
        if (!N(o)) return 0
        let t = window.scrollY,
            e = window.innerHeight,
            n = t + e,
            i = o.getBoundingClientRect(),
            s = i.y + t,
            l = i.height,
            c = s + l
        if (t > c || n < s) return 0
        if ((t < s && n > c) || (s < t && c > n)) return 100
        let h = l
        s < t && (h -= t - s), c > n && (h -= c - n)
        let m = (h / e) * 100
        return Math.round(m)
    },
        Zt = !(typeof window > "u" || !window.document || !window.document.createElement),
        mn,
        pn = [
            "a[href]",
            "area[href]",
            'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
            "select:not([disabled]):not([aria-hidden])",
            "textarea:not([disabled]):not([aria-hidden])",
            "button:not([disabled]):not([aria-hidden]):not(.fancybox-focus-guard)",
            "iframe",
            "object",
            "embed",
            "video",
            "audio",
            "[contenteditable]",
            '[tabindex]:not([tabindex^="-"]):not([disabled]):not([aria-hidden])',
        ].join(","),
        vi = o => {
            if (o && Zt) {
                mn === void 0 &&
                    document.createElement("div").focus({
                        get preventScroll() {
                            return (mn = true), false
                        },
                    })
                try {
                    if (mn) o.focus({ preventScroll: true })
                    else {
                        let t = window.scrollY || document.body.scrollTop,
                            e = window.scrollX || document.body.scrollLeft
                        o.focus(), document.body.scrollTo({ top: t, left: e, behavior: "auto" })
                    }
                } catch { }
            }
        },
        Ai = () => {
            let o = document,
                t,
                e = "",
                n = "",
                i = ""
            return (
                o.fullscreenEnabled
                    ? ((e = "requestFullscreen"), (n = "exitFullscreen"), (i = "fullscreenElement"))
                    : o.webkitFullscreenEnabled &&
                    ((e = "webkitRequestFullscreen"), (n = "webkitExitFullscreen"), (i = "webkitFullscreenElement")),
                e &&
                (t = {
                    request: function (s = o.documentElement) {
                        return e === "webkitRequestFullscreen" ? s[e](Element.ALLOW_KEYBOARD_INPUT) : s[e]()
                    },
                    exit: function () {
                        return o[i] && o[n]()
                    },
                    isFullscreen: function () {
                        return o[i]
                    },
                }),
                t
            )
        },
        Ln = {
            animated: true,
            autoFocus: true,
            backdropClick: "close",
            Carousel: {
                classes: {
                    container: "fancybox__carousel",
                    viewport: "fancybox__viewport",
                    track: "fancybox__track",
                    slide: "fancybox__slide",
                },
            },
            closeButton: "auto",
            closeExisting: false,
            commonCaption: false,
            compact: () => window.matchMedia("(max-width: 578px), (max-height: 578px)").matches,
            contentClick: "toggleZoom",
            contentDblClick: false,
            defaultType: "image",
            defaultDisplay: "flex",
            dragToClose: true,
            Fullscreen: { autoStart: false },
            groupAll: false,
            groupAttr: "data-fancybox",
            hideClass: "f-fadeOut",
            hideScrollbar: true,
            idle: 3500,
            keyboard: {
                Escape: "close",
                Delete: "close",
                Backspace: "close",
                PageUp: "next",
                PageDown: "prev",
                ArrowUp: "prev",
                ArrowDown: "next",
                ArrowRight: "next",
                ArrowLeft: "prev",
            },
            l10n: Object.assign(Object.assign({}, Ni), {
                CLOSE: "Close",
                NEXT: "Next",
                PREV: "Previous",
                MODAL: "You can close this modal content with the ESC key",
                ERROR: "Something Went Wrong, Please Try Again Later",
                IMAGE_ERROR: "Image Not Found",
                ELEMENT_NOT_FOUND: "HTML Element Not Found",
                AJAX_NOT_FOUND: "Error Loading AJAX : Not Found",
                AJAX_FORBIDDEN: "Error Loading AJAX : Forbidden",
                IFRAME_ERROR: "Error Loading Page",
                TOGGLE_ZOOM: "Toggle zoom level",
                TOGGLE_THUMBS: "Toggle thumbnails",
                TOGGLE_SLIDESHOW: "Toggle slideshow",
                TOGGLE_FULLSCREEN: "Toggle full-screen mode",
                DOWNLOAD: "Download",
            }),
            parentEl: null,
            placeFocusBack: true,
            showClass: "f-zoomInUp",
            startIndex: 0,
            tpl: {
                closeButton:
                    '<button data-fancybox-close class="f-button is-close-btn" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M20 20L4 4m16 0L4 20"/></svg></button>',
                main: `<div class="fancybox__container" role="dialog" aria-modal="true" aria-label="{{MODAL}}" tabindex="-1">
    <div class="fancybox__backdrop"></div>
    <div class="fancybox__carousel"></div>
    <div class="fancybox__footer"></div>
  </div>`,
            },
            trapFocus: true,
            wheel: "zoom",
        },
        G,
        _
        ; (function (o) {
            ; (o[(o.Init = 0)] = "Init"),
                (o[(o.Ready = 1)] = "Ready"),
                (o[(o.Closing = 2)] = "Closing"),
                (o[(o.CustomClosing = 3)] = "CustomClosing"),
                (o[(o.Destroy = 4)] = "Destroy")
        })(G || (G = {})),
            (function (o) {
                ; (o[(o.Loading = 0)] = "Loading"),
                    (o[(o.Opening = 1)] = "Opening"),
                    (o[(o.Ready = 2)] = "Ready"),
                    (o[(o.Closing = 3)] = "Closing")
            })(_ || (_ = {}))
    var yi = "",
        Rt = false,
        de = false,
        pt = null,
        Yi = () => {
            let o = "",
                t = "",
                e = K.getInstance()
            if (e) {
                let n = e.carousel,
                    i = e.getSlide()
                if (n && i) {
                    let s = i.slug || void 0,
                        l = i.triggerEl || void 0
                        ; (t = s || e.option("slug") || ""),
                            !t && l && l.dataset && (t = l.dataset.fancybox || ""),
                            t && t !== "true" && (o = "#" + t + (!s && n.slides.length > 1 ? "-" + (i.index + 1) : ""))
                }
            }
            return { hash: o, slug: t, index: 1 }
        },
        Be = () => {
            let o = new URL(document.URL).hash,
                t = o.slice(1).split("-"),
                e = t[t.length - 1],
                n = (e && /^\+?\d+$/.test(e) && parseInt(t.pop() || "1", 10)) || 1
            return { hash: o, slug: t.join("-"), index: n }
        },
        Ji = () => {
            let { slug: o, index: t } = Be()
            if (!o) return
            let e = document.querySelector(`[data-slug="${o}"]`)
            if ((e && e.dispatchEvent(new CustomEvent("click", { bubbles: true, cancelable: true })), K.getInstance()))
                return
            let n = document.querySelectorAll(`[data-fancybox="${o}"]`)
            n.length &&
                ((e = n[t - 1]), e && e.dispatchEvent(new CustomEvent("click", { bubbles: true, cancelable: true })))
        },
        zi = () => {
            if (K.defaults.Hash === false) return
            let o = K.getInstance()
            if (o?.options.Hash === false) return
            let { slug: t, index: e } = Be(),
                { slug: n } = Yi()
            o && (t === n ? o.jumpTo(e - 1) : ((Rt = true), o.close())), Ji()
        },
        Hi = () => {
            pt && clearTimeout(pt),
                queueMicrotask(() => {
                    zi()
                })
        },
        Ei = () => {
            window.addEventListener("hashchange", Hi, false),
                setTimeout(() => {
                    zi()
                }, 500)
        }
    Zt &&
        (/complete|interactive|loaded/.test(document.readyState)
            ? Ei()
            : document.addEventListener("DOMContentLoaded", Ei))
    var he = "is-zooming-in",
        Ue = class extends A {
            onCreateSlide(t, e, n) {
                let i = this.instance.optionFor(n, "src") || ""
                n.el && n.type === "image" && typeof i == "string" && this.setImage(n, i)
            }
            onRemoveSlide(t, e, n) {
                n.panzoom && n.panzoom.destroy(), (n.panzoom = void 0), (n.imageEl = void 0)
            }
            onChange(t, e, n, i) {
                Z(this.instance.container, he)
                for (let s of e.slides) {
                    let l = s.panzoom
                    l && s.index !== n && l.reset(0.35)
                }
            }
            onClose() {
                var t
                let e = this.instance,
                    n = e.container,
                    i = e.getSlide()
                if (!n || !n.parentElement || !i) return
                let { el: s, contentEl: l, panzoom: c, thumbElSrc: h } = i
                if (!s || !h || !l || !c || c.isContentLoading || c.state === O.Init || c.state === O.Destroy) return
                c.updateMetrics()
                let m = this.getZoomInfo(i)
                if (!m) return
                    ; (this.instance.state = G.CustomClosing),
                        n.classList.remove(he),
                        n.classList.add("is-zooming-out"),
                        (l.style.backgroundImage = `url('${h}')`)
                let a = n.getBoundingClientRect()
                    ; (((t = window.visualViewport) === null || t === void 0 ? void 0 : t.scale) || 1) === 1 &&
                        Object.assign(n.style, {
                            position: "absolute",
                            top: `${n.offsetTop + window.scrollY}px`,
                            left: `${n.offsetLeft + window.scrollX}px`,
                            bottom: "auto",
                            right: "auto",
                            width: `${a.width}px`,
                            height: `${a.height}px`,
                            overflow: "hidden",
                        })
                let { x: r, y: d, scale: u, opacity: p } = m
                if (p) {
                    let f = ((Q, b, g, B) => {
                        let x = b - Q,
                            E = B - g
                        return W => g + (((W - Q) / x) * E || 0)
                    })(c.scale, u, 1, 0)
                    c.on("afterTransform", () => {
                        l.style.opacity = f(c.scale) + ""
                    })
                }
                c.on("endAnimation", () => {
                    e.destroy()
                }),
                    (c.target.a = u),
                    (c.target.b = 0),
                    (c.target.c = 0),
                    (c.target.d = u),
                    c.panTo({
                        x: r,
                        y: d,
                        scale: u,
                        friction: p ? 0.2 : 0.33,
                        ignoreBounds: true,
                    }),
                    c.isResting && e.destroy()
            }
            setImage(t, e) {
                let n = this.instance
                    ; (t.src = e),
                        this.process(t, e).then(
                            i => {
                                let { contentEl: s, imageEl: l, thumbElSrc: c, el: h } = t
                                if (n.isClosing() || !s || !l) return
                                s.offsetHeight
                                let m = !!n.isOpeningSlide(t) && this.getZoomInfo(t)
                                if (this.option("protected") && h) {
                                    h.addEventListener("contextmenu", d => {
                                        d.preventDefault()
                                    })
                                    let r = document.createElement("div")
                                    v(r, "fancybox-protected"), s.appendChild(r)
                                }
                                if (c && m) {
                                    let r = i.contentRect,
                                        d = Math.max(r.fullWidth, r.fullHeight),
                                        u = null
                                    !m.opacity &&
                                        d > 1200 &&
                                        ((u = document.createElement("img")),
                                            v(u, "fancybox-ghost"),
                                            (u.src = c),
                                            s.appendChild(u))
                                    let p = () => {
                                        u &&
                                            (v(u, "f-fadeFastOut"),
                                                setTimeout(() => {
                                                    u && (u.remove(), (u = null))
                                                }, 200))
                                    }
                                        ; ((a = c),
                                            new Promise((f, Q) => {
                                                let b = new Image()
                                                    ; (b.onload = f), (b.onerror = Q), (b.src = a)
                                            })).then(
                                                () => {
                                                    n.hideLoading(t),
                                                        (t.state = _.Opening),
                                                        this.instance.emit("reveal", t),
                                                        this.zoomIn(t).then(
                                                            () => {
                                                                p(), this.instance.done(t)
                                                            },
                                                            () => { }
                                                        ),
                                                        u &&
                                                        setTimeout(
                                                            () => {
                                                                p()
                                                            },
                                                            d > 2500 ? 800 : 200
                                                        )
                                                },
                                                () => {
                                                    n.hideLoading(t), n.revealContent(t)
                                                }
                                            )
                                } else {
                                    let r = this.optionFor(t, "initialSize"),
                                        d = this.optionFor(t, "zoom"),
                                        u = {
                                            event: n.prevMouseMoveEvent || n.options.event,
                                            friction: d ? 0.12 : 0,
                                        },
                                        p = n.optionFor(t, "showClass") || void 0,
                                        f = true
                                    n.isOpeningSlide(t) &&
                                        (r === "full"
                                            ? i.zoomToFull(u)
                                            : r === "cover"
                                                ? i.zoomToCover(u)
                                                : r === "max"
                                                    ? i.zoomToMax(u)
                                                    : (f = false),
                                            i.stop("current")),
                                        f && p && (p = i.isDragging ? "f-fadeIn" : ""),
                                        n.hideLoading(t),
                                        n.revealContent(t, p)
                                }
                                var a
                            },
                            () => {
                                n.setError(t, "{{IMAGE_ERROR}}")
                            }
                        )
            }
            process(t, e) {
                return new Promise((n, i) => {
                    var s
                    let l = this.instance,
                        c = t.el
                    l.clearContent(t), l.showLoading(t)
                    let h = this.optionFor(t, "content")
                    if ((typeof h == "string" && (h = tt(h)), !h || !N(h))) {
                        if (((h = document.createElement("img")), h instanceof HTMLImageElement)) {
                            let m = "",
                                a = t.caption
                                ; (m =
                                    typeof a == "string" && a
                                        ? a.replace(/<[^>]+>/gi, "").substring(0, 1e3)
                                        : `Image ${t.index + 1} of ${((s = l.carousel) === null || s === void 0 ? void 0 : s.pages.length) || 1
                                        }`),
                                    (h.src = e || ""),
                                    (h.alt = m),
                                    (h.draggable = false),
                                    t.srcset && h.setAttribute("srcset", t.srcset),
                                    this.instance.isOpeningSlide(t) && (h.fetchPriority = "high")
                        }
                        t.sizes && h.setAttribute("sizes", t.sizes)
                    }
                    v(h, "fancybox-image"),
                        (t.imageEl = h),
                        l.setContent(t, h, false),
                        (t.panzoom = new Qt(
                            c,
                            X({ transformParent: true }, this.option("Panzoom") || {}, {
                                content: h,
                                width: (m, a) => l.optionFor(t, "width", "auto", a) || "auto",
                                height: (m, a) => l.optionFor(t, "height", "auto", a) || "auto",
                                wheel: () => {
                                    let m = l.option("wheel")
                                    return (m === "zoom" || m == "pan") && m
                                },
                                click: (m, a) => {
                                    var r, d
                                    if (
                                        l.isCompact ||
                                        l.isClosing() ||
                                        t.index !== ((r = l.getSlide()) === null || r === void 0 ? void 0 : r.index)
                                    )
                                        return false
                                    if (a) {
                                        let p = a.composedPath()[0]
                                        if (
                                            ["A", "BUTTON", "TEXTAREA", "OPTION", "INPUT", "SELECT", "VIDEO"].includes(
                                                p.nodeName
                                            )
                                        )
                                            return false
                                    }
                                    let u =
                                        !a ||
                                        (a.target &&
                                            ((d = t.contentEl) === null || d === void 0
                                                ? void 0
                                                : d.contains(a.target)))
                                    return l.option(u ? "contentClick" : "backdropClick") || false
                                },
                                dblClick: () => (l.isCompact ? "toggleZoom" : l.option("contentDblClick") || false),
                                spinner: false,
                                panOnlyZoomed: true,
                                wheelLimit: 1 / 0,
                                on: {
                                    ready: m => {
                                        n(m)
                                    },
                                    error: () => {
                                        i()
                                    },
                                    destroy: () => {
                                        i()
                                    },
                                },
                            })
                        ))
                })
            }
            zoomIn(t) {
                return new Promise((e, n) => {
                    let i = this.instance,
                        s = i.container,
                        { panzoom: l, contentEl: c, el: h } = t
                    l && l.updateMetrics()
                    let m = this.getZoomInfo(t)
                    if (!(m && h && c && l && s)) return void n()
                    let { x: a, y: r, scale: d, opacity: u } = m,
                        p = () => {
                            t.state !== _.Closing &&
                                (u && (c.style.opacity = Math.max(Math.min(1, 1 - (1 - l.scale) / (1 - d)), 0) + ""),
                                    l.scale >= 1 && l.scale > l.targetScale - 0.1 && e(l))
                        },
                        f = g => {
                            ; ((g.scale < 0.99 || g.scale > 1.01) && !g.isDragging) ||
                                (Z(s, he),
                                    (c.style.opacity = ""),
                                    g.off("endAnimation", f),
                                    g.off("touchStart", f),
                                    g.off("afterTransform", p),
                                    e(g))
                        }
                    l.on("endAnimation", f),
                        l.on("touchStart", f),
                        l.on("afterTransform", p),
                        l.on(["error", "destroy"], () => {
                            n()
                        }),
                        l.panTo({ x: a, y: r, scale: d, friction: 0, ignoreBounds: true }),
                        l.stop("current")
                    let Q = {
                        event: l.panMode === "mousemove" ? i.prevMouseMoveEvent || i.options.event : void 0,
                    },
                        b = this.optionFor(t, "initialSize")
                    v(s, he),
                        i.hideLoading(t),
                        b === "full"
                            ? l.zoomToFull(Q)
                            : b === "cover"
                                ? l.zoomToCover(Q)
                                : b === "max"
                                    ? l.zoomToMax(Q)
                                    : l.reset(0.172)
                })
            }
            getZoomInfo(t) {
                let { el: e, imageEl: n, thumbEl: i, panzoom: s } = t,
                    l = this.instance,
                    c = l.container
                if (
                    !e ||
                    !n ||
                    !i ||
                    !s ||
                    Xi(i) < 3 ||
                    !this.optionFor(t, "zoom") ||
                    !c ||
                    l.state === G.Destroy ||
                    getComputedStyle(c).getPropertyValue("--f-images-zoom") === "0"
                )
                    return false
                let h = window.visualViewport || null
                if ((h ? h.scale : 1) !== 1) return false
                let { top: m, left: a, width: r, height: d } = i.getBoundingClientRect(),
                    { top: u, left: p, fitWidth: f, fitHeight: Q } = s.contentRect
                if (!(r && d && f && Q)) return false
                let b = s.container.getBoundingClientRect()
                    ; (p += b.left), (u += b.top)
                let g = -1 * (p + 0.5 * f - (a + 0.5 * r)),
                    B = -1 * (u + 0.5 * Q - (m + 0.5 * d)),
                    x = r / f,
                    E = this.option("zoomOpacity") || false
                return E === "auto" && (E = Math.abs(r / d - f / Q) > 0.1), { x: g, y: B, scale: x, opacity: E }
            }
            attach() {
                let t = this,
                    e = t.instance
                e.on("Carousel.change", t.onChange),
                    e.on("Carousel.createSlide", t.onCreateSlide),
                    e.on("Carousel.removeSlide", t.onRemoveSlide),
                    e.on("close", t.onClose)
            }
            detach() {
                let t = this,
                    e = t.instance
                e.off("Carousel.change", t.onChange),
                    e.off("Carousel.createSlide", t.onCreateSlide),
                    e.off("Carousel.removeSlide", t.onRemoveSlide),
                    e.off("close", t.onClose)
            }
        }
    Object.defineProperty(Ue, "defaults", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: {
            initialSize: "fit",
            Panzoom: { maxScale: 1 },
            protected: false,
            zoom: true,
            zoomOpacity: "auto",
        },
    }),
        typeof SuppressedError == "function" && SuppressedError
    var fn = "html",
        xi = "image",
        Qn = "map",
        at = "youtube",
        ht = "vimeo",
        Lt = "html5video",
        wi = (o, t = {}) => {
            let e = new URL(o),
                n = new URLSearchParams(e.search),
                i = new URLSearchParams()
            for (let [c, h] of [...n, ...Object.entries(t)]) {
                let m = h + ""
                if (c === "t") {
                    let a = m.match(/((\d*)m)?(\d*)s?/)
                    a && i.set("start", 60 * parseInt(a[2] || "0") + parseInt(a[3] || "0") + "")
                } else i.set(c, m)
            }
            let s = i + "",
                l = o.match(/#t=((.*)?\d+s)/)
            return l && (s += `#t=${l[1]}`), s
        },
        ba = {
            ajax: null,
            autoSize: true,
            iframeAttr: { allow: "autoplay; fullscreen", scrolling: "auto" },
            preload: true,
            videoAutoplay: true,
            videoRatio: 16 / 9,
            videoTpl: `<video class="fancybox__html5video" playsinline controls controlsList="nodownload" poster="{{poster}}">
  <source src="{{src}}" type="{{format}}" />Sorry, your browser doesn't support embedded videos.</video>`,
            videoFormat: "",
            vimeo: { byline: 1, color: "00adef", controls: 1, dnt: 1, muted: 0 },
            youtube: { controls: 1, enablejsapi: 1, nocookie: 1, rel: 0, fs: 1 },
        },
        ga = ["image", "html", "ajax", "inline", "clone", "iframe", "map", "pdf", "html5video", "youtube", "vimeo"],
        ve = class extends A {
            onBeforeInitSlide(t, e, n) {
                this.processType(n)
            }
            onCreateSlide(t, e, n) {
                this.setContent(n)
            }
            onClearContent(t, e) {
                e.xhr && (e.xhr.abort(), (e.xhr = null))
                let n = e.iframeEl
                n && ((n.onload = n.onerror = null), (n.src = "//about:blank"), (e.iframeEl = null))
                let i = e.contentEl,
                    s = e.placeholderEl
                if (e.type === "inline" && i && s)
                    i.classList.remove("fancybox__content"),
                        getComputedStyle(i).getPropertyValue("display") !== "none" && (i.style.display = "none"),
                        setTimeout(() => {
                            s && (i && s.parentNode && s.parentNode.insertBefore(i, s), s.remove())
                        }, 0),
                        (e.contentEl = void 0),
                        (e.placeholderEl = void 0)
                else for (; e.el && e.el.firstChild;) e.el.removeChild(e.el.firstChild)
            }
            onSelectSlide(t, e, n) {
                n.state === _.Ready && this.playVideo()
            }
            onUnselectSlide(t, e, n) {
                var i, s
                if (n.type === Lt) {
                    try {
                        ; (s = (i = n.el) === null || i === void 0 ? void 0 : i.querySelector("video")) === null ||
                            s === void 0 ||
                            s.pause()
                    } catch { }
                    return
                }
                let l
                n.type === ht
                    ? (l = { method: "pause", value: "true" })
                    : n.type === at && (l = { event: "command", func: "pauseVideo" }),
                    l &&
                    n.iframeEl &&
                    n.iframeEl.contentWindow &&
                    n.iframeEl.contentWindow.postMessage(JSON.stringify(l), "*"),
                    n.poller && clearTimeout(n.poller)
            }
            onDone(t, e) {
                t.isCurrentSlide(e) && !t.isClosing() && this.playVideo()
            }
            onRefresh(t, e) {
                e.slides.forEach(n => {
                    n.el && (this.resizeIframe(n), this.setAspectRatio(n))
                })
            }
            onMessage(t) {
                try {
                    let e = JSON.parse(t.data)
                    if (t.origin === "https://player.vimeo.com") {
                        if (e.event === "ready")
                            for (let n of Array.from(document.getElementsByClassName("fancybox__iframe")))
                                n instanceof HTMLIFrameElement &&
                                    n.contentWindow === t.source &&
                                    (n.dataset.ready = "true")
                    } else if (t.origin.match(/^https:\/\/(www.)?youtube(-nocookie)?.com$/) && e.event === "onReady") {
                        let n = document.getElementById(e.id)
                        n && (n.dataset.ready = "true")
                    }
                } catch { }
            }
            loadAjaxContent(t) {
                let e = this.instance.optionFor(t, "src") || ""
                this.instance.showLoading(t)
                let n = this.instance,
                    i = new XMLHttpRequest()
                n.showLoading(t),
                    (i.onreadystatechange = function () {
                        i.readyState === XMLHttpRequest.DONE &&
                            n.state === G.Ready &&
                            (n.hideLoading(t),
                                i.status === 200
                                    ? n.setContent(t, i.responseText)
                                    : n.setError(t, i.status === 404 ? "{{AJAX_NOT_FOUND}}" : "{{AJAX_FORBIDDEN}}"))
                    })
                let s = t.ajax || null
                i.open(s ? "POST" : "GET", e + ""),
                    i.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
                    i.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
                    i.send(s),
                    (t.xhr = i)
            }
            setInlineContent(t) {
                let e = null
                if (N(t.src)) e = t.src
                else if (typeof t.src == "string") {
                    let n = t.src.split("#", 2).pop()
                    e = n ? document.getElementById(n) : null
                }
                if (e) {
                    if (t.type === "clone" || e.closest(".fancybox__slide")) {
                        e = e.cloneNode(true)
                        let n = e.dataset.animationName
                        n && (e.classList.remove(n), delete e.dataset.animationName)
                        let i = e.getAttribute("id")
                            ; (i = i ? `${i}--clone` : `clone-${this.instance.id}-${t.index}`), e.setAttribute("id", i)
                    } else if (e.parentNode) {
                        let n = document.createElement("div")
                        n.classList.add("fancybox-placeholder"), e.parentNode.insertBefore(n, e), (t.placeholderEl = n)
                    }
                    this.instance.setContent(t, e)
                } else this.instance.setError(t, "{{ELEMENT_NOT_FOUND}}")
            }
            setIframeContent(t) {
                let { src: e, el: n } = t
                if (!e || typeof e != "string" || !n) return
                n.classList.add("is-loading")
                let i = this.instance,
                    s = document.createElement("iframe")
                    ; (s.className = "fancybox__iframe"), s.setAttribute("id", `fancybox__iframe_${i.id}_${t.index}`)
                for (let [c, h] of Object.entries(this.optionFor(t, "iframeAttr") || {})) s.setAttribute(c, h)
                    ; (s.onerror = () => {
                        i.setError(t, "{{IFRAME_ERROR}}")
                    }),
                        (t.iframeEl = s)
                let l = this.optionFor(t, "preload")
                if (t.type !== "iframe" || l === false)
                    return (
                        s.setAttribute("src", t.src + ""),
                        i.setContent(t, s, false),
                        this.resizeIframe(t),
                        void i.revealContent(t)
                    )
                i.showLoading(t),
                    (s.onload = () => {
                        if (!s.src.length) return
                        let c = s.dataset.ready !== "true"
                            ; (s.dataset.ready = "true"), this.resizeIframe(t), c ? i.revealContent(t) : i.hideLoading(t)
                    }),
                    s.setAttribute("src", e),
                    i.setContent(t, s, false)
            }
            resizeIframe(t) {
                let { type: e, iframeEl: n } = t
                if (e === at || e === ht) return
                let i = n?.parentElement
                if (!n || !i) return
                let s = t.autoSize
                s === void 0 && (s = this.optionFor(t, "autoSize"))
                let l = t.width || 0,
                    c = t.height || 0
                l && c && (s = false)
                let h = i && i.style
                if (t.preload !== false && s !== false && h)
                    try {
                        let m = window.getComputedStyle(i),
                            a = parseFloat(m.paddingLeft) + parseFloat(m.paddingRight),
                            r = parseFloat(m.paddingTop) + parseFloat(m.paddingBottom),
                            d = n.contentWindow
                        if (d) {
                            let u = d.document,
                                p = u.getElementsByTagName(fn)[0],
                                f = u.body
                                ; (h.width = ""),
                                    (f.style.overflow = "hidden"),
                                    (l = l || p.scrollWidth + a),
                                    (h.width = `${l}px`),
                                    (f.style.overflow = ""),
                                    (h.flex = "0 0 auto"),
                                    (h.height = `${f.scrollHeight}px`),
                                    (c = p.scrollHeight + r)
                        }
                    } catch { }
                if (l || c) {
                    let m = { flex: "0 1 auto", width: "", height: "" }
                    l && l !== "auto" && (m.width = `${l}px`),
                        c && c !== "auto" && (m.height = `${c}px`),
                        Object.assign(h, m)
                }
            }
            playVideo() {
                let t = this.instance.getSlide()
                if (!t) return
                let { el: e } = t
                if (!e || !e.offsetParent || !this.optionFor(t, "videoAutoplay")) return
                if (t.type === Lt)
                    try {
                        let i = e.querySelector("video")
                        if (i) {
                            let s = i.play()
                            s !== void 0 &&
                                s
                                    .then(() => { })
                                    .catch(l => {
                                        ; (i.muted = true), i.play()
                                    })
                        }
                    } catch { }
                if (t.type !== at && t.type !== ht) return
                let n = () => {
                    if (t.iframeEl && t.iframeEl.contentWindow) {
                        let i
                        if (t.iframeEl.dataset.ready === "true")
                            return (
                                (i =
                                    t.type === at
                                        ? { event: "command", func: "playVideo" }
                                        : { method: "play", value: "true" }),
                                i && t.iframeEl.contentWindow.postMessage(JSON.stringify(i), "*"),
                                void (t.poller = void 0)
                            )
                        t.type === at &&
                            ((i = { event: "listening", id: t.iframeEl.getAttribute("id") }),
                                t.iframeEl.contentWindow.postMessage(JSON.stringify(i), "*"))
                    }
                    t.poller = setTimeout(n, 250)
                }
                n()
            }
            processType(t) {
                if (t.html) return (t.type = fn), (t.src = t.html), void (t.html = "")
                let e = this.instance.optionFor(t, "src", "")
                if (!e || typeof e != "string") return
                let n = t.type,
                    i = null
                if (
                    (i = e.match(
                        /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(?:watch\?(?:.*&)?v=|v\/|u\/|shorts\/|embed\/?)?(videoseries\?list=(?:.*)|[\w-]{11}|\?listType=(?:.*)&list=(?:.*))(?:.*)/i
                    ))
                ) {
                    let s = this.optionFor(t, at),
                        { nocookie: l } = s,
                        c = (function (r, d) {
                            var u = {}
                            for (var p in r)
                                Object.prototype.hasOwnProperty.call(r, p) && d.indexOf(p) < 0 && (u[p] = r[p])
                            if (r != null && typeof Object.getOwnPropertySymbols == "function") {
                                var f = 0
                                for (p = Object.getOwnPropertySymbols(r); f < p.length; f++)
                                    d.indexOf(p[f]) < 0 &&
                                        Object.prototype.propertyIsEnumerable.call(r, p[f]) &&
                                        (u[p[f]] = r[p[f]])
                            }
                            return u
                        })(s, ["nocookie"]),
                        h = `www.youtube${l ? "-nocookie" : ""}.com`,
                        m = wi(e, c),
                        a = encodeURIComponent(i[2])
                        ; (t.videoId = a),
                            (t.src = `https://${h}/embed/${a}?${m}`),
                            (t.thumbSrc = t.thumbSrc || `https://i.ytimg.com/vi/${a}/mqdefault.jpg`),
                            (n = at)
                } else if ((i = e.match(/^.+vimeo.com\/(?:\/)?([\d]+)((\/|\?h=)([a-z0-9]+))?(.*)?/))) {
                    let s = wi(e, this.optionFor(t, ht)),
                        l = encodeURIComponent(i[1]),
                        c = i[4] || ""
                        ; (t.videoId = l),
                            (t.src = `https://player.vimeo.com/video/${l}?${c ? `h=${c}${s ? "&" : ""}` : ""}${s}`),
                            (n = ht)
                }
                if (!n && t.triggerEl) {
                    let s = t.triggerEl.dataset.type
                    ga.includes(s) && (n = s)
                }
                n ||
                    (typeof e == "string" &&
                        (e.charAt(0) === "#"
                            ? (n = "inline")
                            : (i = e.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i))
                                ? ((n = Lt), (t.videoFormat = t.videoFormat || "video/" + (i[1] === "ogv" ? "ogg" : i[1])))
                                : e.match(
                                    /(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i
                                )
                                    ? (n = xi)
                                    : e.match(/\.(pdf)((\?|#).*)?$/i) && (n = "pdf"))),
                    (i = e.match(
                        /(?:maps\.)?google\.([a-z]{2,3}(?:\.[a-z]{2})?)\/(?:(?:(?:maps\/(?:place\/(?:.*)\/)?\@(.*),(\d+.?\d+?)z))|(?:\?ll=))(.*)?/i
                    ))
                        ? ((t.src = `https://maps.google.${i[1]}/?ll=${(i[2]
                            ? i[2] + "&z=" + Math.floor(parseFloat(i[3])) + (i[4] ? i[4].replace(/^\//, "&") : "")
                            : i[4] + ""
                        ).replace(/\?/, "&")}&output=${i[4] && i[4].indexOf("layer=c") > 0 ? "svembed" : "embed"}`),
                            (n = Qn))
                        : (i = e.match(/(?:maps\.)?google\.([a-z]{2,3}(?:\.[a-z]{2})?)\/(?:maps\/search\/)(.*)/i)) &&
                        ((t.src = `https://maps.google.${i[1]}/maps?q=${i[2]
                            .replace("query=", "q=")
                            .replace("api=1", "")}&output=embed`),
                            (n = Qn)),
                    (n = n || this.instance.option("defaultType")),
                    (t.type = n),
                    n === xi && (t.thumbSrc = t.thumbSrc || t.src)
            }
            setContent(t) {
                let e = this.instance.optionFor(t, "src") || ""
                if (t && t.type && e) {
                    switch (t.type) {
                        case fn:
                            this.instance.setContent(t, e)
                            break
                        case Lt:
                            let n = this.option("videoTpl")
                            n &&
                                this.instance.setContent(
                                    t,
                                    n
                                        .replace(/\{\{src\}\}/gi, e + "")
                                        .replace(/\{\{format\}\}/gi, this.optionFor(t, "videoFormat") || "")
                                        .replace(/\{\{poster\}\}/gi, t.poster || t.thumbSrc || "")
                                )
                            break
                        case "inline":
                        case "clone":
                            this.setInlineContent(t)
                            break
                        case "ajax":
                            this.loadAjaxContent(t)
                            break
                        case "pdf":
                        case Qn:
                        case at:
                        case ht:
                            t.preload = false
                        case "iframe":
                            this.setIframeContent(t)
                    }
                    this.setAspectRatio(t)
                }
            }
            setAspectRatio(t) {
                let e = t.contentEl
                if (!(t.el && e && t.type && [at, ht, Lt].includes(t.type))) return
                let n,
                    i = t.width || "auto",
                    s = t.height || "auto"
                if (i === "auto" || s === "auto") {
                    n = this.optionFor(t, "videoRatio")
                    let m = (n + "").match(/(\d+)\s*\/\s?(\d+)/)
                    n = m && m.length > 2 ? parseFloat(m[1]) / parseFloat(m[2]) : parseFloat(n + "")
                } else i && s && (n = i / s)
                if (!n) return
                    ; (e.style.aspectRatio = ""), (e.style.width = ""), (e.style.height = ""), e.offsetHeight
                let l = e.getBoundingClientRect(),
                    c = l.width || 1,
                    h = l.height || 1
                    ; (e.style.aspectRatio = n + ""),
                        n < c / h
                            ? ((s = s === "auto" ? h : Math.min(h, s)),
                                (e.style.width = "auto"),
                                (e.style.height = `${s}px`))
                            : ((i = i === "auto" ? c : Math.min(c, i)),
                                (e.style.width = `${i}px`),
                                (e.style.height = "auto"))
            }
            attach() {
                let t = this,
                    e = t.instance
                e.on("Carousel.beforeInitSlide", t.onBeforeInitSlide),
                    e.on("Carousel.createSlide", t.onCreateSlide),
                    e.on("Carousel.selectSlide", t.onSelectSlide),
                    e.on("Carousel.unselectSlide", t.onUnselectSlide),
                    e.on("Carousel.Panzoom.refresh", t.onRefresh),
                    e.on("done", t.onDone),
                    e.on("clearContent", t.onClearContent),
                    window.addEventListener("message", t.onMessage)
            }
            detach() {
                let t = this,
                    e = t.instance
                e.off("Carousel.beforeInitSlide", t.onBeforeInitSlide),
                    e.off("Carousel.createSlide", t.onCreateSlide),
                    e.off("Carousel.selectSlide", t.onSelectSlide),
                    e.off("Carousel.unselectSlide", t.onUnselectSlide),
                    e.off("Carousel.Panzoom.refresh", t.onRefresh),
                    e.off("done", t.onDone),
                    e.off("clearContent", t.onClearContent),
                    window.removeEventListener("message", t.onMessage)
            }
        }
    Object.defineProperty(ve, "defaults", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: ba,
    })
    var ue = "play",
        me = "pause",
        Vt = "ready",
        ye = class extends A {
            constructor() {
                super(...arguments),
                    Object.defineProperty(this, "state", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: Vt,
                    }),
                    Object.defineProperty(this, "inHover", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: false,
                    }),
                    Object.defineProperty(this, "timer", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: null,
                    }),
                    Object.defineProperty(this, "progressBar", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: null,
                    })
            }
            get isActive() {
                return this.state !== Vt
            }
            onReady(t) {
                this.option("autoStart") && (t.isInfinite || t.page < t.pages.length - 1) && this.start()
            }
            onChange() {
                this.removeProgressBar(), this.pause()
            }
            onSettle() {
                this.resume()
            }
            onVisibilityChange() {
                document.visibilityState === "visible" ? this.resume() : this.pause()
            }
            onMouseEnter() {
                ; (this.inHover = true), this.pause()
            }
            onMouseLeave() {
                var t
                    ; (this.inHover = false),
                        !((t = this.instance.panzoom) === null || t === void 0) && t.isResting && this.resume()
            }
            onTimerEnd() {
                let t = this.instance
                this.state === "play" && (t.isInfinite || t.page !== t.pages.length - 1 ? t.slideNext() : t.slideTo(0))
            }
            removeProgressBar() {
                this.progressBar && (this.progressBar.remove(), (this.progressBar = null))
            }
            createProgressBar() {
                var t
                if (!this.option("showProgress")) return null
                this.removeProgressBar()
                let e = this.instance,
                    n = ((t = e.pages[e.page]) === null || t === void 0 ? void 0 : t.slides) || [],
                    i = this.option("progressParentEl")
                if ((i || (i = (n.length === 1 ? n[0].el : null) || e.viewport), !i)) return null
                let s = document.createElement("div")
                return v(s, "f-progress"), i.prepend(s), (this.progressBar = s), s.offsetHeight, s
            }
            set() {
                let t = this,
                    e = t.instance
                if (e.pages.length < 2 || t.timer) return
                let n = t.option("timeout")
                    ; (t.state = ue), v(e.container, "has-autoplay")
                let i = t.createProgressBar()
                i && ((i.style.transitionDuration = `${n}ms`), (i.style.transform = "scaleX(1)")),
                    (t.timer = setTimeout(() => {
                        ; (t.timer = null), t.inHover || t.onTimerEnd()
                    }, n)),
                    t.emit("set")
            }
            clear() {
                let t = this
                t.timer && (clearTimeout(t.timer), (t.timer = null)), t.removeProgressBar()
            }
            start() {
                let t = this
                if ((t.set(), t.state !== Vt)) {
                    if (t.option("pauseOnHover")) {
                        let e = t.instance.container
                        e.addEventListener("mouseenter", t.onMouseEnter, false),
                            e.addEventListener("mouseleave", t.onMouseLeave, false)
                    }
                    document.addEventListener("visibilitychange", t.onVisibilityChange, false), t.emit("start")
                }
            }
            stop() {
                let t = this,
                    e = t.state,
                    n = t.instance.container
                t.clear(),
                    (t.state = Vt),
                    n.removeEventListener("mouseenter", t.onMouseEnter, false),
                    n.removeEventListener("mouseleave", t.onMouseLeave, false),
                    document.removeEventListener("visibilitychange", t.onVisibilityChange, false),
                    Z(n, "has-autoplay"),
                    e !== Vt && t.emit("stop")
            }
            pause() {
                let t = this
                t.state === ue && ((t.state = me), t.clear(), t.emit(me))
            }
            resume() {
                let t = this,
                    e = t.instance
                if (e.isInfinite || e.page !== e.pages.length - 1)
                    if (t.state !== ue) {
                        if (t.state === me && !t.inHover) {
                            let n = new Event("resume", { bubbles: true, cancelable: true })
                            t.emit("resume", n), n.defaultPrevented || t.set()
                        }
                    } else t.set()
                else t.stop()
            }
            toggle() {
                this.state === ue || this.state === me ? this.stop() : this.start()
            }
            attach() {
                let t = this,
                    e = t.instance
                e.on("ready", t.onReady),
                    e.on("Panzoom.startAnimation", t.onChange),
                    e.on("Panzoom.endAnimation", t.onSettle),
                    e.on("Panzoom.touchMove", t.onChange)
            }
            detach() {
                let t = this,
                    e = t.instance
                e.off("ready", t.onReady),
                    e.off("Panzoom.startAnimation", t.onChange),
                    e.off("Panzoom.endAnimation", t.onSettle),
                    e.off("Panzoom.touchMove", t.onChange),
                    t.stop()
            }
        }
    Object.defineProperty(ye, "defaults", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: {
            autoStart: true,
            pauseOnHover: true,
            progressParentEl: null,
            showProgress: true,
            timeout: 3e3,
        },
    })
    var Ee = class extends A {
        constructor() {
            super(...arguments),
                Object.defineProperty(this, "ref", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: null,
                })
        }
        onPrepare(t) {
            let e = t.carousel
            if (!e) return
            let n = t.container
            n &&
                ((e.options.Autoplay = X({ autoStart: false }, this.option("Autoplay") || {}, {
                    pauseOnHover: false,
                    timeout: this.option("timeout"),
                    progressParentEl: () => this.option("progressParentEl") || null,
                    on: {
                        start: () => {
                            t.emit("startSlideshow")
                        },
                        set: i => {
                            var s
                            n.classList.add("has-slideshow"),
                                ((s = t.getSlide()) === null || s === void 0 ? void 0 : s.state) !== _.Ready &&
                                i.pause()
                        },
                        stop: () => {
                            n.classList.remove("has-slideshow"), t.isCompact || t.endIdle(), t.emit("endSlideshow")
                        },
                        resume: (i, s) => {
                            var l, c, h
                            !s ||
                                !s.cancelable ||
                                (((l = t.getSlide()) === null || l === void 0 ? void 0 : l.state) === _.Ready &&
                                    !(
                                        (h = (c = t.carousel) === null || c === void 0 ? void 0 : c.panzoom) === null ||
                                        h === void 0
                                    ) &&
                                    h.isResting) ||
                                s.preventDefault()
                        },
                    },
                })),
                    e.attachPlugins({ Autoplay: ye }),
                    (this.ref = e.plugins.Autoplay))
        }
        onReady(t) {
            let e = t.carousel,
                n = this.ref
            n && e && this.option("playOnStart") && (e.isInfinite || e.page < e.pages.length - 1) && n.start()
        }
        onDone(t, e) {
            let n = this.ref,
                i = t.carousel
            if (!n || !i) return
            let s = e.panzoom
            s &&
                s.on("startAnimation", () => {
                    t.isCurrentSlide(e) && n.stop()
                }),
                t.isCurrentSlide(e) && n.resume()
        }
        onKeydown(t, e) {
            var n
            let i = this.ref
            i &&
                e === this.option("key") &&
                ((n = document.activeElement) === null || n === void 0 ? void 0 : n.nodeName) !== "BUTTON" &&
                i.toggle()
        }
        attach() {
            let t = this,
                e = t.instance
            e.on("Carousel.init", t.onPrepare),
                e.on("Carousel.ready", t.onReady),
                e.on("done", t.onDone),
                e.on("keydown", t.onKeydown)
        }
        detach() {
            let t = this,
                e = t.instance
            e.off("Carousel.init", t.onPrepare),
                e.off("Carousel.ready", t.onReady),
                e.off("done", t.onDone),
                e.off("keydown", t.onKeydown)
        }
    }
    Object.defineProperty(Ee, "defaults", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: {
            key: " ",
            playOnStart: false,
            progressParentEl: o => {
                var t
                return (
                    ((t = o.instance.container) === null || t === void 0
                        ? void 0
                        : t.querySelector(".fancybox__toolbar [data-fancybox-toggle-slideshow]")) ||
                    o.instance.container
                )
            },
            timeout: 3e3,
        },
    })
    var ji = {
        classes: {
            container: "f-thumbs f-carousel__thumbs",
            viewport: "f-thumbs__viewport",
            track: "f-thumbs__track",
            slide: "f-thumbs__slide",
            isResting: "is-resting",
            isSelected: "is-selected",
            isLoading: "is-loading",
            hasThumbs: "has-thumbs",
        },
        minCount: 2,
        parentEl: null,
        thumbTpl:
            '<button class="f-thumbs__slide__button" tabindex="0" type="button" aria-label="{{GOTO}}" data-carousel-index="%i"><img class="f-thumbs__slide__img" data-lazy-src="{{%s}}" alt="" /></button>',
        type: "modern",
    },
        st
        ; (function (o) {
            ; (o[(o.Init = 0)] = "Init"), (o[(o.Ready = 1)] = "Ready"), (o[(o.Hidden = 2)] = "Hidden")
        })(st || (st = {}))
    var Wi = "isResting",
        pe = "thumbWidth",
        gt = "thumbHeight",
        q = "thumbClipWidth",
        Pi = class extends A {
            constructor() {
                super(...arguments),
                    Object.defineProperty(this, "type", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: "modern",
                    }),
                    Object.defineProperty(this, "container", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: null,
                    }),
                    Object.defineProperty(this, "track", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: null,
                    }),
                    Object.defineProperty(this, "carousel", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: null,
                    }),
                    Object.defineProperty(this, "thumbWidth", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: 0,
                    }),
                    Object.defineProperty(this, "thumbClipWidth", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: 0,
                    }),
                    Object.defineProperty(this, "thumbHeight", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: 0,
                    }),
                    Object.defineProperty(this, "thumbGap", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: 0,
                    }),
                    Object.defineProperty(this, "thumbExtraGap", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: 0,
                    }),
                    Object.defineProperty(this, "state", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: st.Init,
                    })
            }
            get isModern() {
                return this.type === "modern"
            }
            onInitSlide(o, t) {
                let e = t.el ? t.el.dataset : void 0
                e &&
                    ((t.thumbSrc = e.thumbSrc || t.thumbSrc || ""),
                        (t[q] = parseFloat(e[q] || "") || t[q] || 0),
                        (t[gt] = parseFloat(e.thumbHeight || "") || t[gt] || 0)),
                    this.addSlide(t)
            }
            onInitSlides() {
                this.build()
            }
            onChange() {
                var o
                if (!this.isModern) return
                let t = this.container,
                    e = this.instance,
                    n = e.panzoom,
                    i = this.carousel,
                    s = i ? i.panzoom : null,
                    l = e.page
                if (n && i && s) {
                    if (n.isDragging) {
                        Z(t, this.cn(Wi))
                        let c = ((o = i.pages[l]) === null || o === void 0 ? void 0 : o.pos) || 0
                        c += e.getProgress(l) * (this[q] + this.thumbGap)
                        let h = s.getBounds()
                            ; -1 * c > h.x.min && -1 * c < h.x.max && s.panTo({ x: -1 * c, friction: 0.12 })
                    } else et(t, this.cn(Wi), n.isResting)
                    this.shiftModern()
                }
            }
            onRefresh() {
                this.updateProps()
                for (let o of this.instance.slides || []) this.resizeModernSlide(o)
                this.shiftModern()
            }
            isDisabled() {
                let o = this.option("minCount") || 0
                if (o) {
                    let e = this.instance,
                        n = 0
                    for (let i of e.slides || []) i.thumbSrc && n++
                    if (n < o) return true
                }
                let t = this.option("type")
                return ["modern", "classic"].indexOf(t) < 0
            }
            getThumb(o) {
                let t = this.option("thumbTpl") || ""
                return {
                    html: this.instance.localize(t, [
                        ["%i", o.index],
                        ["%d", o.index + 1],
                        [
                            "%s",
                            o.thumbSrc ||
                            "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
                        ],
                    ]),
                }
            }
            addSlide(o) {
                let t = this.carousel
                t && t.addSlide(o.index, this.getThumb(o))
            }
            getSlides() {
                let o = []
                for (let t of this.instance.slides || []) o.push(this.getThumb(t))
                return o
            }
            resizeModernSlide(o) {
                this.isModern && (o[pe] = o[q] && o[gt] ? Math.round(this[gt] * (o[q] / o[gt])) : this[pe])
            }
            updateProps() {
                let o = this.container
                if (!o) return
                let t = e => parseFloat(getComputedStyle(o).getPropertyValue("--f-thumb-" + e)) || 0
                    ; (this.thumbGap = t("gap")),
                        (this.thumbExtraGap = t("extra-gap")),
                        (this[pe] = t("width") || 40),
                        (this[q] = t("clip-width") || 40),
                        (this[gt] = t("height") || 40)
            }
            build() {
                let o = this
                if (o.state !== st.Init) return
                if (o.isDisabled()) return void o.emit("disabled")
                let t = o.instance,
                    e = t.container,
                    n = o.getSlides(),
                    i = o.option("type")
                o.type = i
                let s = o.option("parentEl"),
                    l = o.cn("container"),
                    c = o.cn("track"),
                    h = s?.querySelector("." + l)
                h || ((h = document.createElement("div")), v(h, l), s ? s.appendChild(h) : e.after(h)),
                    v(h, `is-${i}`),
                    v(e, o.cn("hasThumbs")),
                    (o.container = h),
                    o.updateProps()
                let m = h.querySelector("." + c)
                m || ((m = document.createElement("div")), v(m, o.cn("track")), h.appendChild(m)), (o.track = m)
                let a = X(
                    {},
                    {
                        track: m,
                        infinite: false,
                        center: true,
                        fill: i === "classic",
                        dragFree: true,
                        slidesPerPage: 1,
                        transition: false,
                        preload: 0.25,
                        friction: 0.12,
                        Panzoom: { maxVelocity: 0 },
                        Dots: false,
                        Navigation: false,
                        classes: {
                            container: "f-thumbs",
                            viewport: "f-thumbs__viewport",
                            track: "f-thumbs__track",
                            slide: "f-thumbs__slide",
                        },
                    },
                    o.option("Carousel") || {},
                    { Sync: { target: t }, slides: n }
                ),
                    r = new t.constructor(h, a)
                r.on("createSlide", (d, u) => {
                    o.setProps(u.index), o.emit("createSlide", u, u.el)
                }),
                    r.on("ready", () => {
                        o.shiftModern(), o.emit("ready")
                    }),
                    r.on("refresh", () => {
                        o.shiftModern()
                    }),
                    r.on("Panzoom.click", (d, u, p) => {
                        o.onClick(p)
                    }),
                    (o.carousel = r),
                    (o.state = st.Ready)
            }
            onClick(o) {
                o.preventDefault(), o.stopPropagation()
                let t = this.instance,
                    { pages: e, page: n } = t,
                    i = f => {
                        if (f) {
                            let Q = f.closest("[data-carousel-index]")
                            if (Q) return [parseInt(Q.dataset.carouselIndex || "", 10) || 0, Q]
                        }
                        return [-1, void 0]
                    },
                    s = (f, Q) => {
                        let b = document.elementFromPoint(f, Q)
                        return b ? i(b) : [-1, void 0]
                    },
                    [l, c] = i(o.target)
                if (l > -1) return
                let h = this[q],
                    m = o.clientX,
                    a = o.clientY,
                    [r, d] = s(m - h, a),
                    [u, p] = s(m + h, a)
                d && p
                    ? ((l =
                        Math.abs(m - d.getBoundingClientRect().right) < Math.abs(m - p.getBoundingClientRect().left)
                            ? r
                            : u),
                        l === n && (l = l === r ? u : r))
                    : d
                        ? (l = r)
                        : p && (l = u),
                    l > -1 && e[l] && t.slideTo(l)
            }
            getShift(o) {
                var t
                let e = this,
                    { instance: n } = e,
                    i = e.carousel
                if (!n || !i) return 0
                let s = e[pe],
                    l = e[q],
                    c = e.thumbGap,
                    h = e.thumbExtraGap
                if (!(!((t = i.slides[o]) === null || t === void 0) && t.el)) return 0
                let m = 0.5 * (s - l),
                    a = n.pages.length - 1,
                    r = n.getProgress(0),
                    d = n.getProgress(a),
                    u = n.getProgress(o, false, true),
                    p = 0,
                    f = m + h + c,
                    Q = r < 0 && r > -1,
                    b = d > 0 && d < 1
                return (
                    o === 0
                        ? ((p = f * Math.abs(r)), b && r === 1 && (p -= f * Math.abs(d)))
                        : o === a
                            ? ((p = f * Math.abs(d) * -1), Q && d === -1 && (p += f * Math.abs(r)))
                            : Q || b
                                ? ((p = -1 * f), (p += f * Math.abs(r)), (p += f * (1 - Math.abs(d))))
                                : (p = f * u),
                    p
                )
            }
            setProps(o) {
                var t
                let e = this
                if (!e.isModern) return
                let { instance: n } = e,
                    i = e.carousel
                if (n && i) {
                    let s = (t = i.slides[o]) === null || t === void 0 ? void 0 : t.el
                    if (s && s.childNodes.length) {
                        let l = F(1 - Math.abs(n.getProgress(o))),
                            c = F(e.getShift(o))
                        s.style.setProperty("--progress", l ? l + "" : ""), s.style.setProperty("--shift", c + "")
                    }
                }
            }
            shiftModern() {
                let o = this
                if (!o.isModern) return
                let { instance: t, track: e } = o,
                    n = t.panzoom,
                    i = o.carousel
                if (!(t && e && n && i) || n.state === O.Init || n.state === O.Destroy) return
                for (let l of t.slides) o.setProps(l.index)
                let s = (o[q] + o.thumbGap) * (i.slides.length || 0)
                e.style.setProperty("--width", s + "")
            }
            cleanup() {
                let o = this
                o.carousel && o.carousel.destroy(),
                    (o.carousel = null),
                    o.container && o.container.remove(),
                    (o.container = null),
                    o.track && o.track.remove(),
                    (o.track = null),
                    (o.state = st.Init),
                    Z(o.instance.container, o.cn("hasThumbs"))
            }
            attach() {
                let o = this,
                    t = o.instance
                t.on("initSlide", o.onInitSlide),
                    t.state === D.Init ? t.on("initSlides", o.onInitSlides) : o.onInitSlides(),
                    t.on(["change", "Panzoom.afterTransform"], o.onChange),
                    t.on("Panzoom.refresh", o.onRefresh)
            }
            detach() {
                let o = this,
                    t = o.instance
                t.off("initSlide", o.onInitSlide),
                    t.off("initSlides", o.onInitSlides),
                    t.off(["change", "Panzoom.afterTransform"], o.onChange),
                    t.off("Panzoom.refresh", o.onRefresh),
                    o.cleanup()
            }
        }
    Object.defineProperty(Pi, "defaults", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: ji,
    })
    var Fa = Object.assign(Object.assign({}, ji), {
        key: "t",
        showOnStart: true,
        parentEl: null,
    }),
        Li = "is-masked",
        Vi = "aria-hidden",
        xe = class extends A {
            constructor() {
                super(...arguments),
                    Object.defineProperty(this, "ref", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: null,
                    }),
                    Object.defineProperty(this, "hidden", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: false,
                    })
            }
            get isEnabled() {
                let t = this.ref
                return t && !t.isDisabled()
            }
            get isHidden() {
                return this.hidden
            }
            onClick(t, e) {
                e.stopPropagation()
            }
            onCreateSlide(t, e) {
                var n, i, s
                let l =
                    ((s =
                        (i = (n = this.instance) === null || n === void 0 ? void 0 : n.carousel) === null ||
                            i === void 0
                            ? void 0
                            : i.slides[e.index]) === null || s === void 0
                        ? void 0
                        : s.type) || "",
                    c = e.el
                if (c && l) {
                    let h = `for-${l}`
                        ;["video", "youtube", "vimeo", "html5video"].includes(l) && (h += " for-video"), v(c, h)
                }
            }
            onInit() {
                var t
                let e = this,
                    n = e.instance,
                    i = n.carousel
                if (e.ref || !i) return
                let s = e.option("parentEl") || n.footer || n.container
                if (!s) return
                let l = X({}, e.options, {
                    parentEl: s,
                    classes: { container: "f-thumbs fancybox__thumbs" },
                    Carousel: { Sync: { friction: n.option("Carousel.friction") || 0 } },
                    on: {
                        ready: c => {
                            let h = c.container
                            h &&
                                this.hidden &&
                                (e.refresh(),
                                    (h.style.transition = "none"),
                                    e.hide(),
                                    h.offsetHeight,
                                    queueMicrotask(() => {
                                        ; (h.style.transition = ""), e.show()
                                    }))
                        },
                    },
                })
                    ; (l.Carousel = l.Carousel || {}),
                        (l.Carousel.on = X(((t = e.options.Carousel) === null || t === void 0 ? void 0 : t.on) || {}, {
                            click: this.onClick,
                            createSlide: this.onCreateSlide,
                        })),
                        (i.options.Thumbs = l),
                        i.attachPlugins({ Thumbs: Pi }),
                        (e.ref = i.plugins.Thumbs),
                        e.option("showOnStart") || ((e.ref.state = st.Hidden), (e.hidden = true))
            }
            onResize() {
                var t
                let e = (t = this.ref) === null || t === void 0 ? void 0 : t.container
                e && (e.style.maxHeight = "")
            }
            onKeydown(t, e) {
                let n = this.option("key")
                n && n === e && this.toggle()
            }
            toggle() {
                let t = this.ref
                if (t && !t.isDisabled())
                    return t.state === st.Hidden
                        ? ((t.state = st.Init), void t.build())
                        : void (this.hidden ? this.show() : this.hide())
            }
            show() {
                let t = this.ref
                if (!t || t.isDisabled()) return
                let e = t.container
                e && (this.refresh(), e.offsetHeight, e.removeAttribute(Vi), e.classList.remove(Li), (this.hidden = false))
            }
            hide() {
                let t = this.ref,
                    e = t && t.container
                e && (this.refresh(), e.offsetHeight, e.classList.add(Li), e.setAttribute(Vi, "true")),
                    (this.hidden = true)
            }
            refresh() {
                let t = this.ref
                if (!t || !t.state) return
                let e = t.container,
                    n = e?.firstChild || null
                e && n && n.childNodes.length && (e.style.maxHeight = `${n.getBoundingClientRect().height}px`)
            }
            attach() {
                let t = this,
                    e = t.instance
                e.state === G.Init ? e.on("Carousel.init", t.onInit) : t.onInit(),
                    e.on("resize", t.onResize),
                    e.on("keydown", t.onKeydown)
            }
            detach() {
                var t
                let e = this,
                    n = e.instance
                n.off("Carousel.init", e.onInit),
                    n.off("resize", e.onResize),
                    n.off("keydown", e.onKeydown),
                    (t = n.carousel) === null || t === void 0 || t.detachPlugins(["Thumbs"]),
                    (e.ref = null)
            }
        }
    Object.defineProperty(xe, "defaults", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: Fa,
    })
    var bn = {
        panLeft: {
            icon: '<svg><path d="M5 12h14M5 12l6 6M5 12l6-6"/></svg>',
            change: { panX: -100 },
        },
        panRight: {
            icon: '<svg><path d="M5 12h14M13 18l6-6M13 6l6 6"/></svg>',
            change: { panX: 100 },
        },
        panUp: {
            icon: '<svg><path d="M12 5v14M18 11l-6-6M6 11l6-6"/></svg>',
            change: { panY: -100 },
        },
        panDown: {
            icon: '<svg><path d="M12 5v14M18 13l-6 6M6 13l6 6"/></svg>',
            change: { panY: 100 },
        },
        zoomIn: {
            icon: '<svg><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M11 8v6M8 11h6"/></svg>',
            action: "zoomIn",
        },
        zoomOut: {
            icon: '<svg><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M8 11h6"/></svg>',
            action: "zoomOut",
        },
        toggle1to1: {
            icon: '<svg><path d="M3.51 3.07c5.74.02 11.48-.02 17.22.02 1.37.1 2.34 1.64 2.18 3.13 0 4.08.02 8.16 0 12.23-.1 1.54-1.47 2.64-2.79 2.46-5.61-.01-11.24.02-16.86-.01-1.36-.12-2.33-1.65-2.17-3.14 0-4.07-.02-8.16 0-12.23.1-1.36 1.22-2.48 2.42-2.46Z"/><path d="M5.65 8.54h1.49v6.92m8.94-6.92h1.49v6.92M11.5 9.4v.02m0 5.18v0"/></svg>',
            action: "toggleZoom",
        },
        toggleZoom: {
            icon: '<svg><g><line x1="11" y1="8" x2="11" y2="14"></line></g><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M8 11h6"/></svg>',
            action: "toggleZoom",
        },
        iterateZoom: {
            icon: '<svg><g><line x1="11" y1="8" x2="11" y2="14"></line></g><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M8 11h6"/></svg>',
            action: "iterateZoom",
        },
        rotateCCW: {
            icon: '<svg><path d="M15 4.55a8 8 0 0 0-6 14.9M9 15v5H4M18.37 7.16v.01M13 19.94v.01M16.84 18.37v.01M19.37 15.1v.01M19.94 11v.01"/></svg>',
            action: "rotateCCW",
        },
        rotateCW: {
            icon: '<svg><path d="M9 4.55a8 8 0 0 1 6 14.9M15 15v5h5M5.63 7.16v.01M4.06 11v.01M4.63 15.1v.01M7.16 18.37v.01M11 19.94v.01"/></svg>',
            action: "rotateCW",
        },
        flipX: {
            icon: '<svg style="stroke-width: 1.3"><path d="M12 3v18M16 7v10h5L16 7M8 7v10H3L8 7"/></svg>',
            action: "flipX",
        },
        flipY: {
            icon: '<svg style="stroke-width: 1.3"><path d="M3 12h18M7 16h10L7 21v-5M7 8h10L7 3v5"/></svg>',
            action: "flipY",
        },
        fitX: {
            icon: '<svg><path d="M4 12V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6M10 18H3M21 18h-7M6 15l-3 3 3 3M18 15l3 3-3 3"/></svg>',
            action: "fitX",
        },
        fitY: {
            icon: '<svg><path d="M12 20H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6M18 14v7M18 3v7M15 18l3 3 3-3M15 6l3-3 3 3"/></svg>',
            action: "fitY",
        },
        reset: {
            icon: '<svg><path d="M20 11A8.1 8.1 0 0 0 4.5 9M4 5v4h4M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"/></svg>',
            action: "reset",
        },
        toggleFS: {
            icon: '<svg><g><path d="M14.5 9.5 21 3m0 0h-6m6 0v6M3 21l6.5-6.5M3 21v-6m0 6h6"/></g><g><path d="m14 10 7-7m-7 7h6m-6 0V4M3 21l7-7m0 0v6m0-6H4"/></g></svg>',
            action: "toggleFS",
        },
    },
        ft
        ; (function (o) {
            ; (o[(o.Init = 0)] = "Init"), (o[(o.Ready = 1)] = "Ready"), (o[(o.Disabled = 2)] = "Disabled")
        })(ft || (ft = {}))
    var Ba = {
        absolute: "auto",
        display: {
            left: ["infobar"],
            middle: [],
            right: ["iterateZoom", "slideshow", "fullscreen", "thumbs", "close"],
        },
        enabled: "auto",
        items: {
            infobar: {
                tpl: '<div class="fancybox__infobar" tabindex="-1"><span data-fancybox-current-index></span>/<span data-fancybox-count></span></div>',
            },
            download: {
                tpl: '<a class="f-button" title="{{DOWNLOAD}}" data-fancybox-download href="javasript:;"><svg><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 11l5 5 5-5M12 4v12"/></svg></a>',
            },
            prev: {
                tpl: '<button class="f-button" title="{{PREV}}" data-fancybox-prev><svg><path d="m15 6-6 6 6 6"/></svg></button>',
            },
            next: {
                tpl: '<button class="f-button" title="{{NEXT}}" data-fancybox-next><svg><path d="m9 6 6 6-6 6"/></svg></button>',
            },
            slideshow: {
                tpl: '<button class="f-button" title="{{TOGGLE_SLIDESHOW}}" data-fancybox-toggle-slideshow><svg><g><path d="M8 4v16l13 -8z"></path></g><g><path d="M8 4v15M17 4v15"/></g></svg></button>',
            },
            fullscreen: {
                tpl: '<button class="f-button" title="{{TOGGLE_FULLSCREEN}}" data-fancybox-toggle-fullscreen><svg><g><path d="M4 8V6a2 2 0 0 1 2-2h2M4 16v2a2 2 0 0 0 2 2h2M16 4h2a2 2 0 0 1 2 2v2M16 20h2a2 2 0 0 0 2-2v-2"/></g><g><path d="M15 19v-2a2 2 0 0 1 2-2h2M15 5v2a2 2 0 0 0 2 2h2M5 15h2a2 2 0 0 1 2 2v2M5 9h2a2 2 0 0 0 2-2V5"/></g></svg></button>',
            },
            thumbs: {
                tpl: '<button class="f-button" title="{{TOGGLE_THUMBS}}" data-fancybox-toggle-thumbs><svg><circle cx="5.5" cy="5.5" r="1"/><circle cx="12" cy="5.5" r="1"/><circle cx="18.5" cy="5.5" r="1"/><circle cx="5.5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="18.5" cy="12" r="1"/><circle cx="5.5" cy="18.5" r="1"/><circle cx="12" cy="18.5" r="1"/><circle cx="18.5" cy="18.5" r="1"/></svg></button>',
            },
            close: {
                tpl: '<button class="f-button" title="{{CLOSE}}" data-fancybox-close><svg><path d="m19.5 4.5-15 15M4.5 4.5l15 15"/></svg></button>',
            },
        },
        parentEl: null,
    },
        Ua = {
            tabindex: "-1",
            width: "24",
            height: "24",
            viewBox: "0 0 24 24",
            xmlns: "http://www.w3.org/2000/svg",
        },
        Ri = "has-toolbar",
        gn = "fancybox__toolbar",
        we = class extends A {
            constructor() {
                super(...arguments),
                    Object.defineProperty(this, "state", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: ft.Init,
                    }),
                    Object.defineProperty(this, "container", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: null,
                    })
            }
            onReady(t) {
                var e
                if (!t.carousel) return
                let n = this.option("display"),
                    i = this.option("absolute"),
                    s = this.option("enabled")
                if (s === "auto") {
                    let m = this.instance.carousel,
                        a = 0
                    if (m) for (let r of m.slides) (r.panzoom || r.type === "image") && a++
                    a || (s = false)
                }
                s || (n = void 0)
                let l = 0,
                    c = { left: [], middle: [], right: [] }
                if (n)
                    for (let m of ["left", "middle", "right"])
                        for (let a of n[m]) {
                            let r = this.createEl(a)
                            r && ((e = c[m]) === null || e === void 0 || e.push(r), l++)
                        }
                let h = null
                if ((l && (h = this.createContainer()), h)) {
                    for (let [m, a] of Object.entries(c)) {
                        let r = document.createElement("div")
                        v(r, gn + "__column is-" + m)
                        for (let d of a) r.appendChild(d)
                        i !== "auto" || m !== "middle" || a.length || (i = true), h.appendChild(r)
                    }
                    i === true && v(h, "is-absolute"), (this.state = ft.Ready), this.onRefresh()
                } else this.state = ft.Disabled
            }
            onClick(t) {
                var e, n
                let i = this.instance,
                    s = i.getSlide(),
                    l = s?.panzoom,
                    c = t.target,
                    h = c && N(c) ? c.dataset : null
                if (!h) return
                if (h.fancyboxToggleThumbs !== void 0)
                    return (
                        t.preventDefault(),
                        t.stopPropagation(),
                        void ((e = i.plugins.Thumbs) === null || e === void 0 || e.toggle())
                    )
                if (h.fancyboxToggleFullscreen !== void 0)
                    return t.preventDefault(), t.stopPropagation(), void this.instance.toggleFullscreen()
                if (h.fancyboxToggleSlideshow !== void 0) {
                    t.preventDefault(), t.stopPropagation()
                    let r = (n = i.carousel) === null || n === void 0 ? void 0 : n.plugins.Autoplay,
                        d = r.isActive
                    return l && l.panMode === "mousemove" && !d && l.reset(), void (d ? r.stop() : r.start())
                }
                let m = h.panzoomAction,
                    a = h.panzoomChange
                if (((a || m) && (t.preventDefault(), t.stopPropagation()), a)) {
                    let r = {}
                    try {
                        r = JSON.parse(a)
                    } catch { }
                    l && l.applyChange(r)
                } else m && l && l[m] && l[m]()
            }
            onChange() {
                this.onRefresh()
            }
            onRefresh() {
                if (this.instance.isClosing()) return
                let t = this.container
                if (!t) return
                let e = this.instance.getSlide()
                if (!e || e.state !== _.Ready) return
                let n = e && !e.error && e.panzoom
                for (let l of t.querySelectorAll("[data-panzoom-action]"))
                    n
                        ? (l.removeAttribute("disabled"), l.removeAttribute("tabindex"))
                        : (l.setAttribute("disabled", ""), l.setAttribute("tabindex", "-1"))
                let i = n && n.canZoomIn(),
                    s = n && n.canZoomOut()
                for (let l of t.querySelectorAll('[data-panzoom-action="zoomIn"]'))
                    i
                        ? (l.removeAttribute("disabled"), l.removeAttribute("tabindex"))
                        : (l.setAttribute("disabled", ""), l.setAttribute("tabindex", "-1"))
                for (let l of t.querySelectorAll('[data-panzoom-action="zoomOut"]'))
                    s
                        ? (l.removeAttribute("disabled"), l.removeAttribute("tabindex"))
                        : (l.setAttribute("disabled", ""), l.setAttribute("tabindex", "-1"))
                for (let l of t.querySelectorAll(
                    '[data-panzoom-action="toggleZoom"],[data-panzoom-action="iterateZoom"]'
                )) {
                    s || i
                        ? (l.removeAttribute("disabled"), l.removeAttribute("tabindex"))
                        : (l.setAttribute("disabled", ""), l.setAttribute("tabindex", "-1"))
                    let c = l.querySelector("g")
                    c && (c.style.display = i ? "" : "none")
                }
            }
            onDone(t, e) {
                var n
                    ; (n = e.panzoom) === null ||
                        n === void 0 ||
                        n.on("afterTransform", () => {
                            this.instance.isCurrentSlide(e) && this.onRefresh()
                        }),
                        this.instance.isCurrentSlide(e) && this.onRefresh()
            }
            createContainer() {
                let t = this.instance.container
                if (!t) return null
                let e = this.option("parentEl") || t,
                    n = e.querySelector("." + gn)
                return (
                    n || ((n = document.createElement("div")), v(n, gn), e.prepend(n)),
                    n.addEventListener("click", this.onClick, {
                        passive: false,
                        capture: true,
                    }),
                    t && v(t, Ri),
                    (this.container = n),
                    n
                )
            }
            createEl(t) {
                let e = this.instance,
                    n = e.carousel
                if (!n || t === "toggleFS" || (t === "fullscreen" && !Ai())) return null
                let i = null,
                    s = n.slides.length || 0,
                    l = 0,
                    c = 0
                for (let m of n.slides)
                    (m.panzoom || m.type === "image") && l++, (m.type === "image" || m.downloadSrc) && c++
                if (s < 2 && ["infobar", "prev", "next"].includes(t)) return i
                if ((bn[t] !== void 0 && !l) || (t === "download" && !c)) return null
                if (t === "thumbs") {
                    let m = e.plugins.Thumbs
                    if (!m || !m.isEnabled) return null
                }
                if (t === "slideshow" && (!n.plugins.Autoplay || s < 2)) return null
                if (bn[t] !== void 0) {
                    let m = bn[t]
                        ; (i = document.createElement("button")),
                            i.setAttribute("title", this.instance.localize(`{{${t.toUpperCase()}}}`)),
                            v(i, "f-button"),
                            m.action && (i.dataset.panzoomAction = m.action),
                            m.change && (i.dataset.panzoomChange = JSON.stringify(m.change)),
                            i.appendChild(tt(this.instance.localize(m.icon)))
                } else {
                    let m = (this.option("items") || [])[t]
                    m &&
                        ((i = tt(this.instance.localize(m.tpl))),
                            typeof m.click == "function" &&
                            i.addEventListener("click", a => {
                                a.preventDefault(),
                                    a.stopPropagation(),
                                    typeof m.click == "function" && m.click.call(this, this, a)
                            }))
                }
                let h = i?.querySelector("svg")
                if (h) for (let [m, a] of Object.entries(Ua)) h.getAttribute(m) || h.setAttribute(m, String(a))
                return i
            }
            removeContainer() {
                let t = this.container
                t && t.remove(), (this.container = null), (this.state = ft.Disabled)
                let e = this.instance.container
                e && Z(e, Ri)
            }
            attach() {
                let t = this,
                    e = t.instance
                e.on("Carousel.initSlides", t.onReady),
                    e.on("done", t.onDone),
                    e.on(["reveal", "Carousel.change"], t.onChange),
                    t.onReady(t.instance)
            }
            detach() {
                let t = this,
                    e = t.instance
                e.off("Carousel.initSlides", t.onReady),
                    e.off("done", t.onDone),
                    e.off(["reveal", "Carousel.change"], t.onChange),
                    t.removeContainer()
            }
        }
    Object.defineProperty(we, "defaults", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: Ba,
    })
    var va = {
        Hash: class extends A {
            onReady() {
                Rt = false
            }
            onChange(o) {
                pt && clearTimeout(pt)
                let { hash: t } = Yi(),
                    { hash: e } = Be(),
                    n = o.isOpeningSlide(o.getSlide())
                n && (yi = e === t ? "" : e),
                    t &&
                    t !== e &&
                    (pt = setTimeout(() => {
                        try {
                            if (o.state === G.Ready) {
                                let i = "replaceState"
                                n && !de && ((i = "pushState"), (de = true)),
                                    window.history[i](
                                        {},
                                        document.title,
                                        window.location.pathname + window.location.search + t
                                    )
                            }
                        } catch { }
                    }, 300))
            }
            onClose(o) {
                if ((pt && clearTimeout(pt), !Rt && de)) return (de = false), (Rt = false), void window.history.back()
                if (!Rt)
                    try {
                        window.history.replaceState(
                            {},
                            document.title,
                            window.location.pathname + window.location.search + (yi || "")
                        )
                    } catch { }
            }
            attach() {
                let o = this.instance
                o.on("ready", this.onReady),
                    o.on(["Carousel.ready", "Carousel.change"], this.onChange),
                    o.on("close", this.onClose)
            }
            detach() {
                let o = this.instance
                o.off("ready", this.onReady),
                    o.off(["Carousel.ready", "Carousel.change"], this.onChange),
                    o.off("close", this.onClose)
            }
            static parseURL() {
                return Be()
            }
            static startFromUrl() {
                Ji()
            }
            static destroy() {
                window.removeEventListener("hashchange", Hi, false)
            }
        },
        Html: ve,
        Images: Ue,
        Slideshow: Ee,
        Thumbs: xe,
        Toolbar: we,
    },
        Zi = "with-fancybox",
        Fn = "hide-scrollbar",
        Oi = "--fancybox-scrollbar-compensate",
        Ti = "--fancybox-body-margin",
        Bn = "aria-hidden",
        Un = "is-using-tab",
        vn = "is-animated",
        Ci = "is-compact",
        Mi = "is-loading",
        yn = "is-opening",
        fe = "has-caption",
        Ft = "disabled",
        ut = "tabindex",
        Si = "download",
        En = "href",
        Bt = "src",
        ct = o => typeof o == "string",
        ki = function () {
            var o = window.getSelection()
            return !!o && o.type === "Range"
        },
        j,
        P = null,
        mt = null,
        Di = 0,
        Gi = 0,
        Ii = 0,
        _i = 0,
        Ut = new Map(),
        ya = 0,
        K = class o extends Ot {
            get isIdle() {
                return this.idle
            }
            get isCompact() {
                return this.option("compact")
            }
            constructor(t = [], e = {}, n = {}) {
                super(e),
                    Object.defineProperty(this, "userSlides", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: [],
                    }),
                    Object.defineProperty(this, "userPlugins", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: {},
                    }),
                    Object.defineProperty(this, "idle", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: false,
                    }),
                    Object.defineProperty(this, "idleTimer", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: null,
                    }),
                    Object.defineProperty(this, "clickTimer", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: null,
                    }),
                    Object.defineProperty(this, "pwt", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: 0,
                    }),
                    Object.defineProperty(this, "ignoreFocusChange", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: false,
                    }),
                    Object.defineProperty(this, "startedFs", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: false,
                    }),
                    Object.defineProperty(this, "state", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: G.Init,
                    }),
                    Object.defineProperty(this, "id", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: 0,
                    }),
                    Object.defineProperty(this, "container", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: null,
                    }),
                    Object.defineProperty(this, "caption", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: null,
                    }),
                    Object.defineProperty(this, "footer", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: null,
                    }),
                    Object.defineProperty(this, "carousel", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: null,
                    }),
                    Object.defineProperty(this, "lastFocus", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: null,
                    }),
                    Object.defineProperty(this, "prevMouseMoveEvent", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: void 0,
                    }),
                    j || (j = Ai()),
                    (this.id = e.id || ++ya),
                    Ut.set(this.id, this),
                    (this.userSlides = t),
                    (this.userPlugins = n),
                    queueMicrotask(() => {
                        this.init()
                    })
            }
            init() {
                if (this.state === G.Destroy) return
                    ; (this.state = G.Init),
                        this.attachPlugins(Object.assign(Object.assign({}, o.Plugins), this.userPlugins)),
                        this.emit("init"),
                        this.emit("attachPlugins"),
                        this.option("hideScrollbar") === true &&
                        (() => {
                            if (!Zt) return
                            let e = document,
                                n = e.body,
                                i = e.documentElement
                            if (n.classList.contains(Fn)) return
                            let s = window.innerWidth - i.getBoundingClientRect().width,
                                l = parseFloat(window.getComputedStyle(n).marginRight)
                            s < 0 && (s = 0),
                                i.style.setProperty(Oi, `${s}px`),
                                l && n.style.setProperty(Ti, `${l}px`),
                                n.classList.add(Fn)
                        })(),
                        this.initLayout(),
                        this.scale()
                let t = () => {
                    this.initCarousel(this.userSlides),
                        (this.state = G.Ready),
                        this.attachEvents(),
                        this.emit("ready"),
                        setTimeout(() => {
                            this.container && this.container.setAttribute(Bn, "false")
                        }, 16)
                }
                this.option("Fullscreen.autoStart") && j && !j.isFullscreen()
                    ? j
                        .request()
                        .then(() => {
                            ; (this.startedFs = true), t()
                        })
                        .catch(() => t())
                    : t()
            }
            initLayout() {
                var t, e
                let n = this.option("parentEl") || document.body,
                    i = tt(this.localize(this.option("tpl.main") || ""))
                if (i) {
                    if (
                        (i.setAttribute("id", `fancybox-${this.id}`),
                            i.setAttribute("aria-label", this.localize("{{MODAL}}")),
                            i.classList.toggle(Ci, this.isCompact),
                            v(i, this.option("mainClass") || ""),
                            v(i, yn),
                            (this.container = i),
                            (this.footer = i.querySelector(".fancybox__footer")),
                            n.appendChild(i),
                            v(document.documentElement, Zi),
                            (P && mt) ||
                            ((P = document.createElement("span")),
                                v(P, "fancybox-focus-guard"),
                                P.setAttribute(ut, "0"),
                                P.setAttribute(Bn, "true"),
                                P.setAttribute("aria-label", "Focus guard"),
                                (mt = P.cloneNode()),
                                (t = i.parentElement) === null || t === void 0 || t.insertBefore(P, i),
                                (e = i.parentElement) === null || e === void 0 || e.append(mt)),
                            i.addEventListener("mousedown", s => {
                                ; (Di = s.pageX), (Gi = s.pageY), Z(i, Un)
                            }),
                            this.option("closeExisting"))
                    )
                        for (let s of Ut.values()) s.id !== this.id && s.close()
                    else
                        this.option("animated") &&
                            (v(i, vn),
                                setTimeout(() => {
                                    this.isClosing() || Z(i, vn)
                                }, 350))
                    this.emit("initLayout")
                }
            }
            initCarousel(t) {
                let e = this.container
                if (!e) return
                let n = e.querySelector(".fancybox__carousel")
                if (!n) return
                let i = (this.carousel = new vt(
                    n,
                    X(
                        {},
                        {
                            slides: t,
                            transition: "fade",
                            Panzoom: {
                                lockAxis: this.option("dragToClose") ? "xy" : "x",
                                infinite: !!this.option("dragToClose") && "y",
                            },
                            Dots: false,
                            Navigation: {
                                classes: {
                                    container: "fancybox__nav",
                                    button: "f-button",
                                    isNext: "is-next",
                                    isPrev: "is-prev",
                                },
                            },
                            initialPage: this.option("startIndex"),
                            l10n: this.option("l10n"),
                        },
                        this.option("Carousel") || {}
                    )
                ))
                i.on("*", (s, l, ...c) => {
                    this.emit(`Carousel.${l}`, s, ...c)
                }),
                    i.on(["ready", "change"], () => {
                        this.manageCaption()
                    }),
                    this.on("Carousel.removeSlide", (s, l, c) => {
                        this.clearContent(c), (c.state = void 0)
                    }),
                    i.on("Panzoom.touchStart", () => {
                        var s, l
                        this.isCompact || this.endIdle(),
                            !((s = document.activeElement) === null || s === void 0) &&
                            s.closest(".f-thumbs") &&
                            ((l = this.container) === null || l === void 0 || l.focus())
                    }),
                    i.on("settle", () => {
                        this.idleTimer || this.isCompact || !this.option("idle") || this.setIdle(),
                            this.option("autoFocus") && !this.isClosing && this.checkFocus()
                    }),
                    this.option("dragToClose") &&
                    (i.on("Panzoom.afterTransform", (s, l) => {
                        let c = this.getSlide()
                        if (c && xn(c.el)) return
                        let h = this.container
                        if (h) {
                            let m = Math.abs(l.current.f),
                                a = m < 1 ? "" : Math.max(0.5, Math.min(1, 1 - (m / l.contentRect.fitHeight) * 1.5))
                            h.style.setProperty("--fancybox-ts", a ? "0s" : ""),
                                h.style.setProperty("--fancybox-opacity", a + "")
                        }
                    }),
                        i.on("Panzoom.touchEnd", (s, l, c) => {
                            var h
                            let m = this.getSlide()
                            if (
                                (m && xn(m.el)) ||
                                (l.isMobile &&
                                    document.activeElement &&
                                    ["TEXTAREA", "INPUT"].indexOf(
                                        (h = document.activeElement) === null || h === void 0 ? void 0 : h.nodeName
                                    ) !== -1)
                            )
                                return
                            let a = Math.abs(l.dragOffset.y)
                            l.lockedAxis === "y" &&
                                (a >= 200 || (a >= 50 && l.dragOffset.time < 300)) &&
                                (c && c.cancelable && c.preventDefault(),
                                    this.close(c, "f-throwOut" + (l.current.f < 0 ? "Up" : "Down")))
                        })),
                    i.on("change", s => {
                        var l
                        let c = (l = this.getSlide()) === null || l === void 0 ? void 0 : l.triggerEl
                        if (c) {
                            let h = new CustomEvent("slideTo", {
                                bubbles: true,
                                cancelable: true,
                                detail: s.page,
                            })
                            c.dispatchEvent(h)
                        }
                    }),
                    i.on(["refresh", "change"], s => {
                        let l = this.container
                        if (!l) return
                        for (let m of l.querySelectorAll("[data-fancybox-current-index]")) m.innerHTML = s.page + 1
                        for (let m of l.querySelectorAll("[data-fancybox-count]")) m.innerHTML = s.pages.length
                        if (!s.isInfinite) {
                            for (let m of l.querySelectorAll("[data-fancybox-next]"))
                                s.page < s.pages.length - 1
                                    ? (m.removeAttribute(Ft), m.removeAttribute(ut))
                                    : (m.setAttribute(Ft, ""), m.setAttribute(ut, "-1"))
                            for (let m of l.querySelectorAll("[data-fancybox-prev]"))
                                s.page > 0
                                    ? (m.removeAttribute(Ft), m.removeAttribute(ut))
                                    : (m.setAttribute(Ft, ""), m.setAttribute(ut, "-1"))
                        }
                        let c = this.getSlide()
                        if (!c) return
                        let h = c.downloadSrc || ""
                        h || c.type !== "image" || c.error || !ct(c[Bt]) || (h = c[Bt])
                        for (let m of l.querySelectorAll("[data-fancybox-download]")) {
                            let a = c.downloadFilename
                            h
                                ? (m.removeAttribute(Ft),
                                    m.removeAttribute(ut),
                                    m.setAttribute(En, h),
                                    m.setAttribute(Si, a || h),
                                    m.setAttribute("target", "_blank"))
                                : (m.setAttribute(Ft, ""),
                                    m.setAttribute(ut, "-1"),
                                    m.removeAttribute(En),
                                    m.removeAttribute(Si))
                        }
                    }),
                    this.emit("initCarousel")
            }
            attachEvents() {
                let t = this,
                    e = t.container
                if (!e) return
                e.addEventListener("click", t.onClick, { passive: false, capture: false }),
                    e.addEventListener("wheel", t.onWheel, { passive: false, capture: false }),
                    document.addEventListener("keydown", t.onKeydown, {
                        passive: false,
                        capture: true,
                    }),
                    document.addEventListener("visibilitychange", t.onVisibilityChange, false),
                    document.addEventListener("mousemove", t.onMousemove),
                    t.option("trapFocus") && document.addEventListener("focus", t.onFocus, true),
                    window.addEventListener("resize", t.onResize)
                let n = window.visualViewport
                n && (n.addEventListener("scroll", t.onResize), n.addEventListener("resize", t.onResize))
            }
            detachEvents() {
                let t = this,
                    e = t.container
                if (!e) return
                document.removeEventListener("keydown", t.onKeydown, {
                    passive: false,
                    capture: true,
                }),
                    e.removeEventListener("wheel", t.onWheel, {
                        passive: false,
                        capture: false,
                    }),
                    e.removeEventListener("click", t.onClick, {
                        passive: false,
                        capture: false,
                    }),
                    document.removeEventListener("mousemove", t.onMousemove),
                    window.removeEventListener("resize", t.onResize)
                let n = window.visualViewport
                n && (n.removeEventListener("resize", t.onResize), n.removeEventListener("scroll", t.onResize)),
                    document.removeEventListener("visibilitychange", t.onVisibilityChange, false),
                    document.removeEventListener("focus", t.onFocus, true)
            }
            scale() {
                let t = this.container
                if (!t) return
                let e = window.visualViewport,
                    n = Math.max(1, e?.scale || 1),
                    i = "",
                    s = "",
                    l = ""
                if (e && n > 1) {
                    let c = `${e.offsetLeft}px`,
                        h = `${e.offsetTop}px`
                        ; (i = e.width * n + "px"),
                            (s = e.height * n + "px"),
                            (l = `translate3d(${c}, ${h}, 0) scale(${1 / n})`)
                }
                ; (t.style.transform = l), (t.style.width = i), (t.style.height = s)
            }
            onClick(t) {
                var e
                let { container: n, isCompact: i } = this
                if (!n || this.isClosing()) return
                !i && this.option("idle") && this.resetIdle()
                let s = t.composedPath()[0]
                if (s.closest(".fancybox-spinner") || s.closest("[data-fancybox-close]"))
                    return t.preventDefault(), void this.close(t)
                if (s.closest("[data-fancybox-prev]")) return t.preventDefault(), void this.prev()
                if (s.closest("[data-fancybox-next]")) return t.preventDefault(), void this.next()
                if (
                    (t.type === "click" && t.detail === 0) ||
                    Math.abs(t.pageX - Di) > 30 ||
                    Math.abs(t.pageY - Gi) > 30
                )
                    return
                let l = document.activeElement
                if (ki() && l && n.contains(l)) return
                if (i && ((e = this.getSlide()) === null || e === void 0 ? void 0 : e.type) === "image")
                    return void (this.clickTimer
                        ? (clearTimeout(this.clickTimer), (this.clickTimer = null))
                        : (this.clickTimer = setTimeout(() => {
                            this.toggleIdle(), (this.clickTimer = null)
                        }, 350)))
                if ((this.emit("click", t), t.defaultPrevented)) return
                let c = false
                if (s.closest(".fancybox__content")) {
                    if (l) {
                        if (l.closest("[contenteditable]")) return
                        s.matches(pn) || l.blur()
                    }
                    if (ki()) return
                    c = this.option("contentClick")
                } else s.closest(".fancybox__carousel") && !s.matches(pn) && (c = this.option("backdropClick"))
                c === "close"
                    ? (t.preventDefault(), this.close(t))
                    : c === "next"
                        ? (t.preventDefault(), this.next())
                        : c === "prev" && (t.preventDefault(), this.prev())
            }
            onWheel(t) {
                let e = t.target,
                    n = this.option("wheel", t)
                e.closest(".fancybox__thumbs") && (n = "slide")
                let i = n === "slide",
                    s = [-t.deltaX || 0, -t.deltaY || 0, -t.detail || 0].reduce(function (h, m) {
                        return Math.abs(m) > Math.abs(h) ? m : h
                    }),
                    l = Math.max(-1, Math.min(1, s)),
                    c = Date.now()
                this.pwt && c - this.pwt < 300
                    ? i && t.preventDefault()
                    : ((this.pwt = c),
                        this.emit("wheel", t, l),
                        t.defaultPrevented ||
                        (n === "close"
                            ? (t.preventDefault(), this.close(t))
                            : n === "slide" && (Qe(e) || (t.preventDefault(), this[l > 0 ? "prev" : "next"]()))))
            }
            onScroll() {
                window.scrollTo(Ii, _i)
            }
            onKeydown(t) {
                if (!this.isTopmost()) return
                this.isCompact || !this.option("idle") || this.isClosing() || this.resetIdle()
                let e = t.key,
                    n = this.option("keyboard")
                if (!n) return
                let i = t.composedPath()[0],
                    s = document.activeElement && document.activeElement.classList,
                    l = (s && s.contains("f-button")) || i.dataset.carouselPage || i.dataset.carouselIndex
                if (
                    (e !== "Escape" &&
                        !l &&
                        N(i) &&
                        (i.isContentEditable ||
                            ["TEXTAREA", "OPTION", "INPUT", "SELECT", "VIDEO"].indexOf(i.nodeName) !== -1)) ||
                    (t.key === "Tab" ? v(this.container, Un) : Z(this.container, Un),
                        t.ctrlKey || t.altKey || t.shiftKey)
                )
                    return
                this.emit("keydown", e, t)
                let c = n[e]
                c && typeof this[c] == "function" && (t.preventDefault(), this[c]())
            }
            onResize() {
                let t = this.container
                if (!t) return
                let e = this.isCompact
                t.classList.toggle(Ci, e),
                    this.manageCaption(this.getSlide()),
                    this.isCompact ? this.clearIdle() : this.endIdle(),
                    this.scale(),
                    this.emit("resize")
            }
            onFocus(t) {
                this.isTopmost() && this.checkFocus(t)
            }
            onMousemove(t) {
                ; (this.prevMouseMoveEvent = t), !this.isCompact && this.option("idle") && this.resetIdle()
            }
            onVisibilityChange() {
                document.visibilityState === "visible" ? this.checkFocus() : this.endIdle()
            }
            manageCloseBtn(t) {
                let e = this.optionFor(t, "closeButton") || false
                if (e === "auto") {
                    let i = this.plugins.Toolbar
                    if (i && i.state === ft.Ready) return
                }
                if (!e || !t.contentEl || t.closeBtnEl) return
                let n = this.option("tpl.closeButton")
                if (n) {
                    let i = tt(this.localize(n))
                        ; (t.closeBtnEl = t.contentEl.appendChild(i)), t.el && v(t.el, "has-close-btn")
                }
            }
            manageCaption(t = void 0) {
                var e, n
                let i = "fancybox__caption",
                    s = this.container
                if (!s) return
                Z(s, fe)
                let l = this.isCompact || this.option("commonCaption"),
                    c = !l
                if (
                    (this.caption && this.stop(this.caption),
                        c && this.caption && (this.caption.remove(), (this.caption = null)),
                        l && !this.caption)
                )
                    for (let r of ((e = this.carousel) === null || e === void 0 ? void 0 : e.slides) || [])
                        r.captionEl &&
                            (r.captionEl.remove(),
                                (r.captionEl = void 0),
                                Z(r.el, fe),
                                (n = r.el) === null || n === void 0 || n.removeAttribute("aria-labelledby"))
                if ((t || (t = this.getSlide()), !t || (l && !this.isCurrentSlide(t)))) return
                let h = t.el,
                    m = this.optionFor(t, "caption", "")
                if (!m)
                    return void (
                        l &&
                        this.caption &&
                        this.animate(this.caption, "f-fadeOut", () => {
                            this.caption && (this.caption.innerHTML = "")
                        })
                    )
                let a = null
                if (c) {
                    if (((a = t.captionEl || null), h && !a)) {
                        let r = i + `_${this.id}_${t.index}`
                            ; (a = document.createElement("div")),
                                v(a, i),
                                a.setAttribute("id", r),
                                (t.captionEl = h.appendChild(a)),
                                v(h, fe),
                                h.setAttribute("aria-labelledby", r)
                    }
                } else
                    (a = this.caption),
                        a || (a = s.querySelector("." + i)),
                        !a &&
                        ((a = document.createElement("div")),
                            (a.dataset.fancyboxCaption = ""),
                            v(a, i),
                            (this.footer || s).prepend(a)),
                        v(s, fe),
                        (this.caption = a)
                a &&
                    ((a.innerHTML = ""),
                        ct(m) || typeof m == "number"
                            ? (a.innerHTML = m + "")
                            : m instanceof HTMLElement && a.appendChild(m))
            }
            checkFocus(t) {
                this.focus(t)
            }
            focus(t) {
                var e
                if (this.ignoreFocusChange) return
                let n = document.activeElement || null,
                    i = t?.target || null,
                    s = this.container,
                    l = (e = this.carousel) === null || e === void 0 ? void 0 : e.viewport
                if (!s || !l || (!t && n && s.contains(n))) return
                let c = this.getSlide(),
                    h = c && c.state === _.Ready ? c.el : null
                if (!h || h.contains(n) || s === n) return
                t && t.cancelable && t.preventDefault(), (this.ignoreFocusChange = true)
                let m = Array.from(s.querySelectorAll(pn)),
                    a = [],
                    r = null
                for (let u of m) {
                    let p = !u.offsetParent || !!u.closest('[aria-hidden="true"]'),
                        f = h && h.contains(u),
                        Q = !l.contains(u)
                    if (u === s || ((f || Q) && !p)) {
                        a.push(u)
                        let b = u.dataset.origTabindex
                        b !== void 0 && b && (u.tabIndex = parseFloat(b)),
                            u.removeAttribute("data-orig-tabindex"),
                            (!u.hasAttribute("autoFocus") && r) || (r = u)
                    } else {
                        let b =
                            u.dataset.origTabindex === void 0
                                ? u.getAttribute("tabindex") || ""
                                : u.dataset.origTabindex
                        b && (u.dataset.origTabindex = b), (u.tabIndex = -1)
                    }
                }
                let d = null
                t
                    ? (!i || a.indexOf(i) < 0) &&
                    ((d = r || s),
                        a.length && (n === mt ? (d = a[0]) : (this.lastFocus !== s && n !== P) || (d = a[a.length - 1])))
                    : (d = c && c.type === "image" ? s : r || s),
                    d && vi(d),
                    (this.lastFocus = document.activeElement),
                    (this.ignoreFocusChange = false)
            }
            next() {
                let t = this.carousel
                t && t.pages.length > 1 && t.slideNext()
            }
            prev() {
                let t = this.carousel
                t && t.pages.length > 1 && t.slidePrev()
            }
            jumpTo(...t) {
                this.carousel && this.carousel.slideTo(...t)
            }
            isTopmost() {
                var t
                return ((t = o.getInstance()) === null || t === void 0 ? void 0 : t.id) == this.id
            }
            animate(t = null, e = "", n) {
                if (!t || !e) return void (n && n())
                this.stop(t)
                let i = s => {
                    s.target === t &&
                        t.dataset.animationName &&
                        (t.removeEventListener("animationend", i), delete t.dataset.animationName, n && n(), Z(t, e))
                }
                    ; (t.dataset.animationName = e), t.addEventListener("animationend", i), v(t, e)
            }
            stop(t) {
                t &&
                    t.dispatchEvent(
                        new CustomEvent("animationend", {
                            bubbles: false,
                            cancelable: true,
                            currentTarget: t,
                        })
                    )
            }
            setContent(t, e = "", n = true) {
                if (this.isClosing()) return
                let i = t.el
                if (!i) return
                let s = null
                if (
                    (N(e)
                        ? (s = e)
                        : ((s = tt(e + "")), N(s) || ((s = document.createElement("div")), (s.innerHTML = e + ""))),
                        ["img", "picture", "iframe", "video", "audio"].includes(s.nodeName.toLowerCase()))
                ) {
                    let l = document.createElement("div")
                    l.appendChild(s), (s = l)
                }
                N(s) && t.filter && !t.error && (s = s.querySelector(t.filter)),
                    s && N(s)
                        ? (v(s, "fancybox__content"),
                            t.id && s.setAttribute("id", t.id),
                            i.classList.add(`has-${t.error ? "error" : t.type || "unknown"}`),
                            i.prepend(s),
                            s.style.display === "none" && (s.style.display = ""),
                            getComputedStyle(s).getPropertyValue("display") === "none" &&
                            (s.style.display = t.display || this.option("defaultDisplay") || "flex"),
                            (t.contentEl = s),
                            n && this.revealContent(t),
                            this.manageCloseBtn(t),
                            this.manageCaption(t))
                        : this.setError(t, "{{ELEMENT_NOT_FOUND}}")
            }
            revealContent(t, e) {
                let n = t.el,
                    i = t.contentEl
                n &&
                    i &&
                    (this.emit("reveal", t),
                        this.hideLoading(t),
                        (t.state = _.Opening),
                        (e = this.isOpeningSlide(t) ? (e === void 0 ? this.optionFor(t, "showClass") : e) : "f-fadeIn")
                            ? this.animate(i, e, () => {
                                this.done(t)
                            })
                            : this.done(t))
            }
            done(t) {
                this.isClosing() ||
                    ((t.state = _.Ready),
                        this.emit("done", t),
                        v(t.el, "is-done"),
                        this.isCurrentSlide(t) &&
                        this.option("autoFocus") &&
                        queueMicrotask(() => {
                            var e
                                ; (e = t.panzoom) === null || e === void 0 || e.updateControls(),
                                    this.option("autoFocus") && this.focus()
                        }),
                        this.isOpeningSlide(t) &&
                        (Z(this.container, yn), !this.isCompact && this.option("idle") && this.setIdle()))
            }
            isCurrentSlide(t) {
                let e = this.getSlide()
                return !(!t || !e) && e.index === t.index
            }
            isOpeningSlide(t) {
                var e, n
                return (
                    ((e = this.carousel) === null || e === void 0 ? void 0 : e.prevPage) === null &&
                    t &&
                    t.index === ((n = this.getSlide()) === null || n === void 0 ? void 0 : n.index)
                )
            }
            showLoading(t) {
                t.state = _.Loading
                let e = t.el
                e &&
                    (v(e, Mi),
                        this.emit("loading", t),
                        t.spinnerEl ||
                        setTimeout(() => {
                            if (!this.isClosing() && !t.spinnerEl && t.state === _.Loading) {
                                let n = tt(Rn)
                                v(n, "fancybox-spinner"), (t.spinnerEl = n), e.prepend(n), this.animate(n, "f-fadeIn")
                            }
                        }, 250))
            }
            hideLoading(t) {
                let e = t.el
                if (!e) return
                let n = t.spinnerEl
                this.isClosing()
                    ? n?.remove()
                    : (Z(e, Mi),
                        n &&
                        this.animate(n, "f-fadeOut", () => {
                            n.remove()
                        }),
                        t.state === _.Loading && (this.emit("loaded", t), (t.state = _.Ready)))
            }
            setError(t, e) {
                if (this.isClosing()) return
                let n = new Event("error", { bubbles: true, cancelable: true })
                if ((this.emit("error", n, t), n.defaultPrevented)) return
                    ; (t.error = e), this.hideLoading(t), this.clearContent(t)
                let i = document.createElement("div")
                i.classList.add("fancybox-error"),
                    (i.innerHTML = this.localize(e || "<p>{{ERROR}}</p>")),
                    this.setContent(t, i)
            }
            clearContent(t) {
                if (t.state === void 0) return
                this.emit("clearContent", t), t.contentEl && (t.contentEl.remove(), (t.contentEl = void 0))
                let e = t.el
                e && (Z(e, "has-error"), Z(e, "has-unknown"), Z(e, `has-${t.type || "unknown"}`)),
                    t.closeBtnEl && t.closeBtnEl.remove(),
                    (t.closeBtnEl = void 0),
                    t.captionEl && t.captionEl.remove(),
                    (t.captionEl = void 0),
                    t.spinnerEl && t.spinnerEl.remove(),
                    (t.spinnerEl = void 0)
            }
            getSlide() {
                var t
                let e = this.carousel
                return ((t = e?.pages[e?.page]) === null || t === void 0 ? void 0 : t.slides[0]) || void 0
            }
            close(t, e) {
                if (this.isClosing()) return
                let n = new Event("shouldClose", { bubbles: true, cancelable: true })
                if ((this.emit("shouldClose", n, t), n.defaultPrevented)) return
                t && t.cancelable && (t.preventDefault(), t.stopPropagation())
                let i = () => {
                    this.proceedClose(t, e)
                }
                this.startedFs && j && j.isFullscreen() ? Promise.resolve(j.exit()).then(() => i()) : i()
            }
            clearIdle() {
                this.idleTimer && clearTimeout(this.idleTimer), (this.idleTimer = null)
            }
            setIdle(t = false) {
                let e = () => {
                    this.clearIdle(), (this.idle = true), v(this.container, "is-idle"), this.emit("setIdle")
                }
                if ((this.clearIdle(), !this.isClosing()))
                    if (t) e()
                    else {
                        let n = this.option("idle")
                        n && (this.idleTimer = setTimeout(e, n))
                    }
            }
            endIdle() {
                this.clearIdle(),
                    this.idle &&
                    !this.isClosing() &&
                    ((this.idle = false), Z(this.container, "is-idle"), this.emit("endIdle"))
            }
            resetIdle() {
                this.endIdle(), this.setIdle()
            }
            toggleIdle() {
                this.idle ? this.endIdle() : this.setIdle(true)
            }
            toggleFullscreen() {
                j &&
                    (j.isFullscreen()
                        ? j.exit()
                        : j.request().then(() => {
                            this.startedFs = true
                        }))
            }
            isClosing() {
                return [G.Closing, G.CustomClosing, G.Destroy].includes(this.state)
            }
            proceedClose(t, e) {
                var n, i
                    ; (this.state = G.Closing), this.clearIdle(), this.detachEvents()
                let s = this.container,
                    l = this.carousel,
                    c = this.getSlide(),
                    h = c && this.option("placeFocusBack") ? c.triggerEl || this.option("triggerEl") : null
                if (
                    (h && (Xi(h) ? vi(h) : h.focus()),
                        s &&
                        (Z(s, yn),
                            v(s, "is-closing"),
                            s.setAttribute(Bn, "true"),
                            this.option("animated") && v(s, vn),
                            (s.style.pointerEvents = "none")),
                        l)
                ) {
                    l.clearTransitions(),
                        (n = l.panzoom) === null || n === void 0 || n.destroy(),
                        (i = l.plugins.Navigation) === null || i === void 0 || i.detach()
                    for (let m of l.slides) {
                        ; (m.state = _.Closing), this.hideLoading(m)
                        let a = m.contentEl
                        a && this.stop(a)
                        let r = m?.panzoom
                        r && (r.stop(), r.detachEvents(), r.detachObserver()),
                            this.isCurrentSlide(m) || l.emit("removeSlide", m)
                    }
                }
                ; (Ii = window.scrollX),
                    (_i = window.scrollY),
                    window.addEventListener("scroll", this.onScroll),
                    this.emit("close", t),
                    this.state !== G.CustomClosing
                        ? (e === void 0 && c && (e = this.optionFor(c, "hideClass")),
                            e && c
                                ? (this.animate(c.contentEl, e, () => {
                                    l && l.emit("removeSlide", c)
                                }),
                                    setTimeout(() => {
                                        this.destroy()
                                    }, 500))
                                : this.destroy())
                        : setTimeout(() => {
                            this.destroy()
                        }, 500)
            }
            destroy() {
                var t
                if (this.state === G.Destroy) return
                window.removeEventListener("scroll", this.onScroll),
                    (this.state = G.Destroy),
                    (t = this.carousel) === null || t === void 0 || t.destroy()
                let e = this.container
                e && e.remove(), Ut.delete(this.id)
                let n = o.getInstance()
                n
                    ? n.focus()
                    : (P && (P.remove(), (P = null)),
                        mt && (mt.remove(), (mt = null)),
                        Z(document.documentElement, Zi),
                        (() => {
                            if (!Zt) return
                            let i = document,
                                s = i.body
                            s.classList.remove(Fn),
                                s.style.setProperty(Ti, ""),
                                i.documentElement.style.setProperty(Oi, "")
                        })(),
                        this.emit("destroy"))
            }
            static bind(t, e, n) {
                if (!Zt) return
                let i,
                    s = "",
                    l = {}
                if (
                    (t === void 0
                        ? (i = document.body)
                        : ct(t)
                            ? ((i = document.body), (s = t), typeof e == "object" && (l = e || {}))
                            : ((i = t), ct(e) && (s = e), typeof n == "object" && (l = n || {})),
                        !i || !N(i))
                )
                    return
                s = s || "[data-fancybox]"
                let c = o.openers.get(i) || new Map()
                c.set(s, l), o.openers.set(i, c), c.size === 1 && i.addEventListener("click", o.fromEvent)
            }
            static unbind(t, e) {
                let n,
                    i = ""
                if ((ct(t) ? ((n = document.body), (i = t)) : ((n = t), ct(e) && (i = e)), !n)) return
                let s = o.openers.get(n)
                s && i && s.delete(i), (i && s) || (o.openers.delete(n), n.removeEventListener("click", o.fromEvent))
            }
            static destroy() {
                let t
                for (; (t = o.getInstance());) t.destroy()
                for (let e of o.openers.keys()) e.removeEventListener("click", o.fromEvent)
                o.openers = new Map()
            }
            static fromEvent(t) {
                if (t.defaultPrevented || (t.button && t.button !== 0) || t.ctrlKey || t.metaKey || t.shiftKey) return
                let e = t.composedPath()[0],
                    n = e.closest("[data-fancybox-trigger]")
                if (n) {
                    let p = n.dataset.fancyboxTrigger || "",
                        f = document.querySelectorAll(`[data-fancybox="${p}"]`),
                        Q = parseInt(n.dataset.fancyboxIndex || "", 10) || 0
                    e = f[Q] || e
                }
                if (!(e && e instanceof Element)) return
                let i, s, l, c
                if (
                    ([...o.openers].reverse().find(
                        ([p, f]) =>
                            !(
                                !p.contains(e) ||
                                ![...f].reverse().find(([Q, b]) => {
                                    let g = e.closest(Q)
                                    return !!g && ((i = p), (s = Q), (l = g), (c = b), true)
                                })
                            )
                    ),
                        !i || !s || !l)
                )
                    return
                        ; (c = c || {}), t.preventDefault(), (e = l)
                let h = [],
                    m = X({}, Ln, c)
                    ; (m.event = t), (m.triggerEl = e), (m.delegate = n)
                let a = m.groupAll,
                    r = m.groupAttr,
                    d = r && e ? e.getAttribute(`${r}`) : ""
                if (
                    ((!e || d || a) && (h = [].slice.call(i.querySelectorAll(s))),
                        e && !a && (h = d ? h.filter(p => p.getAttribute(`${r}`) === d) : [e]),
                        !h.length)
                )
                    return
                let u = o.getInstance()
                return u && u.options.triggerEl && h.indexOf(u.options.triggerEl) > -1
                    ? void 0
                    : (e && (m.startIndex = h.indexOf(e)), o.fromNodes(h, m))
            }
            static fromSelector(t, e, n) {
                let i = null,
                    s = "",
                    l = {}
                if (
                    (ct(t)
                        ? ((i = document.body), (s = t), typeof e == "object" && (l = e || {}))
                        : t instanceof HTMLElement &&
                        ct(e) &&
                        ((i = t), (s = e), typeof n == "object" && (l = n || {})),
                        !i || !s)
                )
                    return false
                let c = o.openers.get(i)
                return !!c && ((l = X({}, c.get(s) || {}, l)), !!l && o.fromNodes(Array.from(i.querySelectorAll(s)), l))
            }
            static fromNodes(t, e) {
                e = X({}, Ln, e || {})
                let n = []
                for (let i of t) {
                    let s = i.dataset || {},
                        l = s[Bt] || i.getAttribute(En) || i.getAttribute("currentSrc") || i.getAttribute(Bt) || void 0,
                        c,
                        h = e.delegate,
                        m
                    h &&
                        n.length === e.startIndex &&
                        (c = h instanceof HTMLImageElement ? h : h.querySelector("img:not([aria-hidden])")),
                        c || (c = i instanceof HTMLImageElement ? i : i.querySelector("img:not([aria-hidden])")),
                        c &&
                        ((m = c.currentSrc || c[Bt] || void 0),
                            !m && c.dataset && (m = c.dataset.lazySrc || c.dataset[Bt] || void 0))
                    let a = {
                        src: l,
                        triggerEl: i,
                        thumbEl: c,
                        thumbElSrc: m,
                        thumbSrc: m,
                    }
                    for (let r in s) {
                        let d = s[r] + ""
                            ; (d = d !== "false" && (d === "true" || d)), (a[r] = d)
                    }
                    n.push(a)
                }
                return new o(n, e)
            }
            static getInstance(t) {
                return t
                    ? Ut.get(t)
                    : Array.from(Ut.values())
                        .reverse()
                        .find(e => !e.isClosing() && e) || null
            }
            static getSlide() {
                var t
                return ((t = o.getInstance()) === null || t === void 0 ? void 0 : t.getSlide()) || null
            }
            static show(t = [], e = {}) {
                return new o(t, e)
            }
            static next() {
                let t = o.getInstance()
                t && t.next()
            }
            static prev() {
                let t = o.getInstance()
                t && t.prev()
            }
            static close(t = true, ...e) {
                if (t) for (let n of Ut.values()) n.close(...e)
                else {
                    let n = o.getInstance()
                    n && n.close(...e)
                }
            }
        }
    Object.defineProperty(K, "version", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "5.0.36",
    }),
        Object.defineProperty(K, "defaults", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: Ln,
        }),
        Object.defineProperty(K, "Plugins", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: va,
        }),
        Object.defineProperty(K, "openers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map(),
        })
    var Zn = class extends V {
        initialize() {
            this.forceClose = this.forceClose.bind(this)
        }
        connect() {
            this.openValue && this.open(), document.addEventListener("turbo:before-render", this.forceClose)
        }
        disconnect() {
            document.removeEventListener("turbo:before-render", this.forceClose)
        }
        open() {
            this.dialogTarget.showModal()
        }
        close() {
            this.dialogTarget.setAttribute("closing", ""),
                Promise.all(this.dialogTarget.getAnimations().map(t => t.finished)).then(() => {
                    this.dialogTarget.removeAttribute("closing"), this.dialogTarget.close()
                })
        }
        backdropClose(t) {
            t.target === this.dialogTarget && this.close()
        }
        forceClose() {
            this.dialogTarget.close()
        }
    }
        ; (Zn.targets = ["dialog"]), (Zn.values = { open: { type: Boolean, default: false } })
    var Ki = Zn
    var On = {}
    J(On, { default: () => Tt })
    var Tt = class extends V {
        connect() {
            this.nextNote = false
        }
        audioPlayerTargetConnected(o) {
            let t = o.querySelector("audio")
            t.volume = this.volumeValue
        }
        playAudio(o) {
            let t = o.target
            o.target.classList.contains("audio-player") || (t = o.target.closest(".audio-player"))
            let e = t.querySelector("audio")
            if (this.playingValue && this.playingValue != t.id) {
                let n = document.getElementById(this.playingValue)
                n && n.querySelector("audio").pause()
            }
            e.paused && e.play(),
                t.classList.add("playing"),
                (this.playingValue = t.id),
                t.dataset.bpm && (this.bpmValue = t.dataset.bpm)
        }
        toggleAudio(o) {
            let t = o.target
            o.target.classList.contains("audio-player") || (t = o.target.closest(".audio-player"))
            let e = t.querySelector("audio")
            t.classList.contains("playing") ? e.pause() : e.play()
        }
        pauseAudio(o) {
            let t = o.target
            o.target.classList.contains("audio-player") || (t = o.target.closest(".audio-player"))
            let e = t.querySelector("audio")
            t.classList.remove("playing"), document.querySelector(".audio-player.playing") || (this.playingValue = "")
        }
        spawnNote() {
            if (this.playingValue) {
                let o = document.getElementById(this.playingValue)
                if (o) {
                    let t = o.querySelector(".audio-player__dog")
                    if (t) {
                        o.classList.contains("playing-alt")
                            ? o.classList.remove("playing-alt")
                            : o.classList.add("playing-alt")
                        let e = document.createElement("img")
                            ; (e.src = "/assets/images/note-small.png"),
                                e.classList.add("absolute", "animate-note", "z-30", "pixel"),
                                (e.width = 18),
                                (e.height = 18)
                        let n = Math.floor(Math.random() * 10) - 10,
                            i = Math.floor(Math.random() * 10) - 5,
                            s = Math.floor(Math.random() * 10) - 40
                        e.setAttribute(
                            "style",
                            `top: ${Math.floor(Math.random() * 10) - 10}; left: ${Math.floor(Math.random() * 30) + 40
                            }%; offset-path: path('M 0 0 C ${n} ${n / 2} ${i} ${s} ${i} ${s}`
                        ),
                            t.appendChild(e),
                            setTimeout(function () {
                                e.remove()
                            }, 1e3),
                            o.dataset.bpm && (this.bpmValue = o.dataset.bpm),
                            (this.nextNote = setTimeout(this.spawnNote.bind(this), (60 / this.bpmValue) * 1e3))
                    }
                }
            }
        }
        updateVolume(o) {
            o.target.muted
                ? ((this.mutedValue = true), (this.volumeValue = 0))
                : ((this.mutedValue = false), (this.volumeValue = o.target.volume))
            for (let t of this.audioPlayerTargets) {
                let e = t.querySelector("audio")
                e.volume = this.volumeValue
            }
        }
        stopNotes() {
            this.nextNote && (clearTimeout(this.nextNote), (this.nextNote = false))
        }
        syncNotes() {
            this.stopNotes(), this.spawnNote()
        }
    }
    R(Tt, "targets", ["audioPlayer"]),
        R(Tt, "values", {
            playing: { type: String },
            bpm: { type: Number, default: 90 },
            volume: { type: Number, default: 0.5 },
            muted: { type: Boolean, default: false },
        })
    var In = {}
    J(In, { default: () => Gt })
    var Tn = typeof navigator < "u" ? navigator.userAgent.toLowerCase().indexOf("firefox") > 0 : false
    function Cn(o, t, e, n) {
        o.addEventListener ? o.addEventListener(t, e, n) : o.attachEvent && o.attachEvent("on".concat(t), e)
    }
    function Ct(o, t, e, n) {
        o.removeEventListener ? o.removeEventListener(t, e, n) : o.detachEvent && o.detachEvent("on".concat(t), e)
    }
    function to(o, t) {
        let e = t.slice(0, t.length - 1)
        for (let n = 0; n < e.length; n++) e[n] = o[e[n].toLowerCase()]
        return e
    }
    function eo(o) {
        typeof o != "string" && (o = ""), (o = o.replace(/\s/g, ""))
        let t = o.split(","),
            e = t.lastIndexOf("")
        for (; e >= 0;) (t[e - 1] += ","), t.splice(e, 1), (e = t.lastIndexOf(""))
        return t
    }
    function Ea(o, t) {
        let e = o.length >= t.length ? o : t,
            n = o.length >= t.length ? t : o,
            i = true
        for (let s = 0; s < e.length; s++) n.indexOf(e[s]) === -1 && (i = false)
        return i
    }
    var St = {
        backspace: 8,
        "\u232B": 8,
        tab: 9,
        clear: 12,
        enter: 13,
        "\u21A9": 13,
        return: 13,
        esc: 27,
        escape: 27,
        space: 32,
        left: 37,
        up: 38,
        right: 39,
        down: 40,
        del: 46,
        delete: 46,
        ins: 45,
        insert: 45,
        home: 36,
        end: 35,
        pageup: 33,
        pagedown: 34,
        capslock: 20,
        num_0: 96,
        num_1: 97,
        num_2: 98,
        num_3: 99,
        num_4: 100,
        num_5: 101,
        num_6: 102,
        num_7: 103,
        num_8: 104,
        num_9: 105,
        num_multiply: 106,
        num_add: 107,
        num_enter: 108,
        num_subtract: 109,
        num_decimal: 110,
        num_divide: 111,
        "\u21EA": 20,
        ",": 188,
        ".": 190,
        "/": 191,
        "`": 192,
        "-": Tn ? 173 : 189,
        "=": Tn ? 61 : 187,
        ";": Tn ? 59 : 186,
        "'": 222,
        "[": 219,
        "]": 221,
        "\\": 220,
    },
        nt = {
            "\u21E7": 16,
            shift: 16,
            "\u2325": 18,
            alt: 18,
            option: 18,
            "\u2303": 17,
            ctrl: 17,
            control: 17,
            "\u2318": 91,
            cmd: 91,
            command: 91,
        },
        Le = {
            16: "shiftKey",
            18: "altKey",
            17: "ctrlKey",
            91: "metaKey",
            shiftKey: 16,
            ctrlKey: 17,
            altKey: 18,
            metaKey: 91,
        },
        I = { 16: false, 18: false, 17: false, 91: false },
        M = {}
    for (let o = 1; o < 20; o++) St["f".concat(o)] = 111 + o
    var C = [],
        Mt = null,
        no = "all",
        rt = new Map(),
        Dt = o => St[o.toLowerCase()] || nt[o.toLowerCase()] || o.toUpperCase().charCodeAt(0),
        xa = o => Object.keys(St).find(t => St[t] === o),
        wa = o => Object.keys(nt).find(t => nt[t] === o)
    function io(o) {
        no = o || "all"
    }
    function kt() {
        return no || "all"
    }
    function Wa() {
        return C.slice(0)
    }
    function La() {
        return C.map(o => xa(o) || wa(o) || String.fromCharCode(o))
    }
    function Va() {
        let o = []
        return (
            Object.keys(M).forEach(t => {
                M[t].forEach(e => {
                    let { key: n, scope: i, mods: s, shortcut: l } = e
                    o.push({
                        scope: i,
                        shortcut: l,
                        mods: s,
                        keys: n.split("+").map(c => Dt(c)),
                    })
                })
            }),
            o
        )
    }
    function Ra(o) {
        let t = o.target || o.srcElement,
            { tagName: e } = t,
            n = true,
            i =
                e === "INPUT" &&
                !["checkbox", "radio", "range", "button", "file", "reset", "submit", "color"].includes(t.type)
        return (t.isContentEditable || ((i || e === "TEXTAREA" || e === "SELECT") && !t.readOnly)) && (n = false), n
    }
    function Za(o) {
        return typeof o == "string" && (o = Dt(o)), C.indexOf(o) !== -1
    }
    function Oa(o, t) {
        let e, n
        o || (o = kt())
        for (let i in M)
            if (Object.prototype.hasOwnProperty.call(M, i))
                for (e = M[i], n = 0; n < e.length;)
                    e[n].scope === o
                        ? e.splice(n, 1).forEach(l => {
                            let { element: c } = l
                            return Sn(c)
                        })
                        : n++
        kt() === o && io(t || "all")
    }
    function Ta(o) {
        let t = o.keyCode || o.which || o.charCode,
            e = C.indexOf(t)
        if (
            (e >= 0 && C.splice(e, 1),
                o.key && o.key.toLowerCase() === "meta" && C.splice(0, C.length),
                (t === 93 || t === 224) && (t = 91),
                t in I)
        ) {
            I[t] = false
            for (let n in nt) nt[n] === t && ($[n] = false)
        }
    }
    function oo(o) {
        if (typeof o > "u")
            Object.keys(M).forEach(i => {
                Array.isArray(M[i]) && M[i].forEach(s => We(s)), delete M[i]
            }),
                Sn(null)
        else if (Array.isArray(o))
            o.forEach(i => {
                i.key && We(i)
            })
        else if (typeof o == "object") o.key && We(o)
        else if (typeof o == "string") {
            for (var t = arguments.length, e = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++) e[n - 1] = arguments[n]
            let [i, s] = e
            typeof i == "function" && ((s = i), (i = "")), We({ key: o, scope: i, method: s, splitKey: "+" })
        }
    }
    var We = o => {
        let { key: t, scope: e, method: n, splitKey: i = "+" } = o
        eo(t).forEach(l => {
            let c = l.split(i),
                h = c.length,
                m = c[h - 1],
                a = m === "*" ? "*" : Dt(m)
            if (!M[a]) return
            e || (e = kt())
            let r = h > 1 ? to(nt, c) : [],
                d = []
                ; (M[a] = M[a].filter(u => {
                    let f = (n ? u.method === n : true) && u.scope === e && Ea(u.mods, r)
                    return f && d.push(u.element), !f
                })),
                    d.forEach(u => Sn(u))
        })
    }
    function $i(o, t, e, n) {
        if (t.element !== n) return
        let i
        if (t.scope === e || t.scope === "all") {
            i = t.mods.length > 0
            for (let s in I)
                Object.prototype.hasOwnProperty.call(I, s) &&
                    ((!I[s] && t.mods.indexOf(+s) > -1) || (I[s] && t.mods.indexOf(+s) === -1)) &&
                    (i = false)
                    ; ((t.mods.length === 0 && !I[16] && !I[18] && !I[17] && !I[91]) || i || t.shortcut === "*") &&
                        ((t.keys = []),
                            (t.keys = t.keys.concat(C)),
                            t.method(o, t) === false &&
                            (o.preventDefault ? o.preventDefault() : (o.returnValue = false),
                                o.stopPropagation && o.stopPropagation(),
                                o.cancelBubble && (o.cancelBubble = true)))
        }
    }
    function qi(o, t) {
        let e = M["*"],
            n = o.keyCode || o.which || o.charCode
        if (!$.filter.call(this, o)) return
        if (
            ((n === 93 || n === 224) && (n = 91),
                C.indexOf(n) === -1 && n !== 229 && C.push(n),
                ["metaKey", "ctrlKey", "altKey", "shiftKey"].forEach(c => {
                    let h = Le[c]
                    o[c] && C.indexOf(h) === -1
                        ? C.push(h)
                        : !o[c] && C.indexOf(h) > -1
                            ? C.splice(C.indexOf(h), 1)
                            : c === "metaKey" && o[c] && (C = C.filter(m => m in Le || m === n))
                }),
                n in I)
        ) {
            I[n] = true
            for (let c in nt) nt[c] === n && ($[c] = true)
            if (!e) return
        }
        for (let c in I) Object.prototype.hasOwnProperty.call(I, c) && (I[c] = o[Le[c]])
        o.getModifierState &&
            !(o.altKey && !o.ctrlKey) &&
            o.getModifierState("AltGraph") &&
            (C.indexOf(17) === -1 && C.push(17), C.indexOf(18) === -1 && C.push(18), (I[17] = true), (I[18] = true))
        let i = kt()
        if (e)
            for (let c = 0; c < e.length; c++)
                e[c].scope === i &&
                    ((o.type === "keydown" && e[c].keydown) || (o.type === "keyup" && e[c].keyup)) &&
                    $i(o, e[c], i, t)
        if (!(n in M)) return
        let s = M[n],
            l = s.length
        for (let c = 0; c < l; c++)
            if (((o.type === "keydown" && s[c].keydown) || (o.type === "keyup" && s[c].keyup)) && s[c].key) {
                let h = s[c],
                    { splitKey: m } = h,
                    a = h.key.split(m),
                    r = []
                for (let d = 0; d < a.length; d++) r.push(Dt(a[d]))
                r.sort().join("") === C.sort().join("") && $i(o, h, i, t)
            }
    }
    function $(o, t, e) {
        C = []
        let n = eo(o),
            i = [],
            s = "all",
            l = document,
            c = 0,
            h = false,
            m = true,
            a = "+",
            r = false,
            d = false
        for (
            e === void 0 && typeof t == "function" && (e = t),
            Object.prototype.toString.call(t) === "[object Object]" &&
            (t.scope && (s = t.scope),
                t.element && (l = t.element),
                t.keyup && (h = t.keyup),
                t.keydown !== void 0 && (m = t.keydown),
                t.capture !== void 0 && (r = t.capture),
                typeof t.splitKey == "string" && (a = t.splitKey),
                t.single === true && (d = true)),
            typeof t == "string" && (s = t),
            d && oo(o, s);
            c < n.length;
            c++
        )
            (o = n[c].split(a)),
                (i = []),
                o.length > 1 && (i = to(nt, o)),
                (o = o[o.length - 1]),
                (o = o === "*" ? "*" : Dt(o)),
                o in M || (M[o] = []),
                M[o].push({
                    keyup: h,
                    keydown: m,
                    scope: s,
                    mods: i,
                    shortcut: n[c],
                    method: e,
                    key: n[c],
                    splitKey: a,
                    element: l,
                })
        if (typeof l < "u" && window) {
            if (!rt.has(l)) {
                let u = function () {
                    let f = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : window.event
                    return qi(f, l)
                },
                    p = function () {
                        let f = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : window.event
                        qi(f, l), Ta(f)
                    }
                rt.set(l, { keydownListener: u, keyupListenr: p, capture: r }),
                    Cn(l, "keydown", u, r),
                    Cn(l, "keyup", p, r)
            }
            if (!Mt) {
                let u = () => {
                    C = []
                }
                    ; (Mt = { listener: u, capture: r }), Cn(window, "focus", u, r)
            }
        }
    }
    function Ca(o) {
        let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "all"
        Object.keys(M).forEach(e => {
            M[e]
                .filter(i => i.scope === t && i.shortcut === o)
                .forEach(i => {
                    i && i.method && i.method()
                })
        })
    }
    function Sn(o) {
        let t = Object.values(M).flat()
        if (
            t.findIndex(n => {
                let { element: i } = n
                return i === o
            }) < 0
        ) {
            let { keydownListener: n, keyupListenr: i, capture: s } = rt.get(o) || {}
            n && i && (Ct(o, "keyup", i, s), Ct(o, "keydown", n, s), rt.delete(o))
        }
        if (
            (t.length <= 0 || rt.size <= 0) &&
            (Object.keys(rt).forEach(i => {
                let { keydownListener: s, keyupListenr: l, capture: c } = rt.get(i) || {}
                s && l && (Ct(i, "keyup", l, c), Ct(i, "keydown", s, c), rt.delete(i))
            }),
                rt.clear(),
                Object.keys(M).forEach(i => delete M[i]),
                Mt)
        ) {
            let { listener: i, capture: s } = Mt
            Ct(window, "focus", i, s), (Mt = null)
        }
    }
    var Mn = {
        getPressedKeyString: La,
        setScope: io,
        getScope: kt,
        deleteScope: Oa,
        getPressedKeyCodes: Wa,
        getAllKeyCodes: Va,
        isPressed: Za,
        filter: Ra,
        trigger: Ca,
        unbind: oo,
        keyMap: St,
        modifier: nt,
        modifierMap: Le,
    }
    for (let o in Mn) Object.prototype.hasOwnProperty.call(Mn, o) && ($[o] = Mn[o])
    if (typeof window < "u") {
        let o = window.hotkeys
            ; ($.noConflict = t => (t && window.hotkeys === $ && (window.hotkeys = o), $)), (window.hotkeys = $)
    }
    function Ma(o, t) {
        var e = {}
        for (var n in o) Object.prototype.hasOwnProperty.call(o, n) && t.indexOf(n) < 0 && (e[n] = o[n])
        if (o != null && typeof Object.getOwnPropertySymbols == "function")
            for (var i = 0, n = Object.getOwnPropertySymbols(o); i < n.length; i++)
                t.indexOf(n[i]) < 0 && Object.prototype.propertyIsEnumerable.call(o, n[i]) && (e[n[i]] = o[n[i]])
        return e
    }
    var kn = { debug: false, logger: console, dispatchEvent: true, eventPrefix: true },
        Dn = class {
            constructor(t, e = {}) {
                var n, i, s
                    ; (this.log = (h, m) => {
                        this.debug &&
                            (this.logger.groupCollapsed(
                                `%c${this.controller.identifier} %c#${h}`,
                                "color: #3B82F6",
                                "color: unset"
                            ),
                                this.logger.log(Object.assign({ controllerId: this.controllerId }, m)),
                                this.logger.groupEnd())
                    }),
                        (this.warn = h => {
                            this.logger.warn(
                                `%c${this.controller.identifier} %c${h}`,
                                "color: #3B82F6; font-weight: bold",
                                "color: unset"
                            )
                        }),
                        (this.dispatch = (h, m = {}) => {
                            if (this.dispatchEvent) {
                                let { event: a } = m,
                                    r = Ma(m, ["event"]),
                                    d = this.extendedEvent(h, a || null, r)
                                this.targetElement.dispatchEvent(d),
                                    this.log("dispatchEvent", Object.assign({ eventName: d.type }, r))
                            }
                        }),
                        (this.call = (h, m = {}) => {
                            let a = this.controller[h]
                            if (typeof a == "function") return a.call(this.controller, m)
                        }),
                        (this.extendedEvent = (h, m, a) => {
                            let {
                                bubbles: r,
                                cancelable: d,
                                composed: u,
                            } = m || { bubbles: true, cancelable: true, composed: true }
                            return (
                                m && Object.assign(a, { originalEvent: m }),
                                new CustomEvent(this.composeEventName(h), {
                                    bubbles: r,
                                    cancelable: d,
                                    composed: u,
                                    detail: a,
                                })
                            )
                        }),
                        (this.composeEventName = h => {
                            let m = h
                            return (
                                this.eventPrefix === true
                                    ? (m = `${this.controller.identifier}:${h}`)
                                    : typeof this.eventPrefix == "string" && (m = `${this.eventPrefix}:${h}`),
                                m
                            )
                        }),
                        (this.debug =
                            (i = (n = e?.debug) !== null && n !== void 0 ? n : t.application.stimulusUseDebug) !== null &&
                                i !== void 0
                                ? i
                                : kn.debug),
                        (this.logger = (s = e?.logger) !== null && s !== void 0 ? s : kn.logger),
                        (this.controller = t),
                        (this.controllerId = t.element.id || t.element.dataset.id),
                        (this.targetElement = e?.element || t.element)
                let { dispatchEvent: l, eventPrefix: c } = Object.assign({}, kn, e)
                Object.assign(this, { dispatchEvent: l, eventPrefix: c }),
                    (this.controllerInitialize = t.initialize.bind(t)),
                    (this.controllerConnect = t.connect.bind(t)),
                    (this.controllerDisconnect = t.disconnect.bind(t))
            }
        },
        Gn = class extends Dn {
            constructor(t, e) {
                super(t, e),
                    (this.bind = () => {
                        for (let [n, i] of Object.entries(this.hotkeysOptions.hotkeys)) {
                            let s = i.handler.bind(this.controller)
                            $(n, i.options, l => s(l, l))
                        }
                    }),
                    (this.unbind = () => {
                        for (let n in this.hotkeysOptions.hotkeys) $.unbind(n)
                    }),
                    (this.controller = t),
                    (this.hotkeysOptions = e),
                    this.enhanceController(),
                    this.bind()
            }
            enhanceController() {
                this.hotkeysOptions.filter && ($.filter = this.hotkeysOptions.filter)
                let t = this.controller.disconnect.bind(this.controller),
                    e = () => {
                        this.unbind(), t()
                    }
                Object.assign(this.controller, { disconnect: e })
            }
        },
        Sa = o => ({ handler: o[0], options: { element: o[1] } }),
        ka = o => {
            if (!o.hotkeys) {
                let t = {}
                Object.entries(o).forEach(([e, n]) => {
                    Object.defineProperty(t, e, {
                        value: Sa(n),
                        writable: false,
                        enumerable: true,
                    })
                }),
                    (o = { hotkeys: t })
            }
            return o
        },
        ao = (o, t) => new Gn(o, ka(t))
    var Gt = class extends V {
        connect() {
            ; (this.butTarget.style.left = "120%"),
                ao(this, {
                    hotkeys: {
                        left: {
                            handler: this.startMove,
                            options: { keydown: true, keyup: true },
                        },
                    },
                }),
                window.requestAnimationFrame(this.moveLeft.bind(this))
        }
        startMove(o) {
            o.type == "keydown" ? (this.movingValue = true) : (this.movingValue = false)
        }
        moveLeft() {
            if (this.movingValue) {
                let o = this.butTarget.style.left.replace("%", "")
                o > 75 && (this.butTarget.style.left = `${o - 0.05}%`)
            }
            window.requestAnimationFrame(this.moveLeft.bind(this))
        }
    }
    R(Gt, "targets", ["but"]), R(Gt, "values", { moving: { type: Boolean, default: false } })
    var _n = {}
    J(_n, { default: () => It })
    var It = class extends V {
        connect() {
            ; (this.localeValue = document.querySelector('meta[property="og:locale"]').content),
                this.getLatestCountdown()
        }
        updateCountdown() {
            ; (this.timeSinceRefreshValue += 1),
                this.timeSinceRefreshValue >= 300 && ((this.timeSinceRefreshValue = 0), this.getLatestCountdown())
            let o = new Date().getTime(),
                t = new Date(this.timeValue),
                e = "",
                n = t.getTime() - o,
                days = Math.abs(Math.ceil(n / (1e3 * 60 * 60 * 24)))
            days < 10 && days > 0 && (days = `0${days}`)
            let hours = Math.abs(Math.ceil((n % (1e3 * 60 * 60 * 24)) / (1e3 * 60 * 60)))
            hours < 10 && hours >= 0 && (hours = `0${hours}`)
            let minutes = Math.abs(Math.ceil((n % (1e3 * 60 * 60)) / (1e3 * 60)))
            minutes < 10 && minutes >= 0 && (minutes = `0${minutes}`)
            minutes == 0 && (minutes = "00")
            let seconds = Math.abs(Math.ceil((n % (1e3 * 60)) / 1e3))
            if (
                (seconds < 10 && (seconds = `0${seconds}`),
                    days == 0 ? (hours == 0 ? (e = " scale-[1.5]") : (e = " scale-[1.3]")) : days <= 3 && (e = " scale-[1.1]"),
                    n > 0)
            )
                (this.dateTarget.innerHTML = "NOW"),
                    (this.countdownTarget.innerHTML = "(REFRESH)"),
                    document.getElementById("index2").classList.remove("hidden"),
                    document.getElementById("index1").classList.add("hidden")
            else {
                if (this.localeValue == "ja_JP")
                    this.dateTarget.innerHTML = `${this.timeValue.substring(0, 4)}\u5E74${this.timeValue.substring(
                        6,
                        7
                    )}\u6708${this.timeValue.substring(9, 10)}\u65E5\u3000\u30EA\u30EA\u30FC\u30B9`
                else {
                    let h = [
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December",
                    ],
                        m = this.timeValue.substring(9, 10)
                        ; (this.dateTarget.innerHTML = `Released on ${h[t.getMonth()]} ${m - 1}, ${this.timeValue.substring(
                            0,
                            4
                        )}`),
                            (this.infoTarget.innerHTML = `* ${h[t.getMonth()]} ${m} in Japan, Australia, and New Zealand`)
                }
                console.log(days, hours, minutes, seconds, hours > 0, days > 0)
                this.countdownTarget.innerHTML = `<div class='flex gap-x-2 items-center justify-center${e}'>${days > 0
                    ? "<span class='text-3xl whitespace-nowrap md:text-6xl min-w-[50px] md:min-w-[86px] text-right'>" +
                    days +
                    "</span><span class='text-2xl md:text-5xl w-4 md:w-8'>:</span>"
                    : ""
                    }${hours > 0
                        ? "<span class='text-3xl whitespace-nowrap md:text-6xl min-w-[50px] md:min-w-[86px] text-right'>" +
                        hours +
                        "</span><span class='text-2xl md:text-5xl w-4 md:w-8'>:</span>"
                        : ""
                    }<span class='text-3xl whitespace-nowrap md:text-6xl min-w-[50px] md:min-w-[86px] text-right'>${minutes}</span><span class='text-2xl md:text-5xl w-4 md:w-8'>:</span><span class='text-3xl whitespace-nowrap md:text-6xl min-w-[50px] md:min-w-[86px] text-right'>${seconds}</span></div>`
            }
        }
        getLatestCountdown() {
            fetch(this.sourceValue, { cache: "no-store" })
                .then(o => o.text())
                .then(o => {
                    o == "NO"
                        ? this.startCountdown()
                        : o.includes("https") || ((this.timeValue = o), this.startCountdown())
                })
                .catch(o => {
                    ; (this.timeValue = "2025-06-05T00:00:00+09:00"), this.startCountdown()
                })
        }
        startCountdown() {
            this.updateCountdown(),
                this.startedValue || (setInterval(this.updateCountdown.bind(this), 1e3), (this.startedValue = true))
        }
    }
    R(It, "targets", ["date", "countdown", "info"]),
        R(It, "values", {
            time: { type: String, default: "" },
            cooldown: { type: Number, default: 0 },
            started: { type: Boolean, default: false },
            locale: { type: String, default: "en_US" },
            source: { type: String, default: "/is-it-ready-yet.txt" },
            timeSinceRefresh: { type: Number, default: 0 },
        })
    var Nn = {}
    J(Nn, { default: () => Ve })
    var Ve = class extends V {
        connect() {
            if (this.hasContainerTarget) {
                for (var o = Math.floor(Math.random() * 4) + 6, t = 0; t < o; t++) {
                    var e = Math.floor(Math.random() * 600) + 600 + t * 10,
                        n = Math.floor(Math.random() * 450) + 20 + t * 10
                    t % 2 == 0 && (e = 0 - e - 20), this.appendParticle(e, n, this.containerTarget)
                }
                for (var i = Math.floor(Math.random() * 4) + 8, t = 0; t < i; t++) {
                    var e = Math.floor(Math.random() * 600) + 800 + t * 10,
                        n = Math.floor(Math.random() * 450) + 20 + t * 10
                    t % 2 == 0 && (e = 0 - e - 20), this.appendPixel(e, n, this.containerTarget)
                }
            }
            if (this.hasMobileTarget && false) {
                var o
                for (var t; t < o; t++) var e, n
                var i
                for (var t; t < i; t++) var e, n
            }
        }
        appendParticle(o, t, e, n = 12) {
            var i = Math.floor(Math.random() * 3) + 1
            o > 0 && (i += 3)
            var s = Math.floor(Math.random() * 6) + 1,
                l = Math.floor(Math.random() * 80) + 50
            t += l * 2
            var c = document.createElement("img")
            c.setAttribute("class", "absolute opacity-50 animate-pulse motion-safe:translate-y-0"),
                c.setAttribute("data-distance", l),
                c.setAttribute("data-scroll-target", "parallax"),
                c.setAttribute("src", `/assets/images/particle-${i}.png`),
                c.setAttribute(
                    "style",
                    `margin-left: ${o}px; margin-top: ${t}px; animation-delay: -${s}s; max-width: ${n}px`
                ),
                c.setAttribute("aria-hidden", "true"),
                e.append(c)
        }
        appendPixel(o, t, e, n = 4) {
            var i = Math.floor(Math.random() * n) + 2,
                s = Math.floor(Math.random() * 6) + 1,
                l = Math.floor(Math.random() * 100) + 20,
                c = Math.floor(Math.random() * 200)
            t += l * 2
            var h = document.createElement("span")
            h.setAttribute("class", "absolute animate-pulse motion-safe:translate-y-0 border-0"),
                h.setAttribute("data-distance", l),
                h.setAttribute("data-scroll-target", "parallax"),
                h.setAttribute(
                    "style",
                    `margin-left: ${o}px; margin-top: ${t}px; width: ${i}px; height: ${i}px; background-color: rgb(${c}, ${c}, 255); animation-delay: -${s}s`
                ),
                h.setAttribute("aria-hidden", "true"),
                e.append(h)
        }
    }
    R(Ve, "targets", ["particle", "container", "mobile"])
    var Xn = {}
    J(Xn, { default: () => Nt })
    var _t = Pt(Ze(), 1)
    var Nt = class extends V {
        connect() {
            let o = new _t.Howl({
                src: ["/assets/audio/sprinkle.ogg", "/assets/audio/sprinkle.mp3"],
                volume: 0.5,
            })
            this.sprinkle = o
            let t = new _t.Howl({
                src: ["/assets/audio/bagel_ralsei.ogg", "/assets/audio/bagel_ralsei.mp3"],
                volume: 0.5,
            })
            this.ralsei = t
            let e = new _t.Howl({
                src: ["/assets/audio/bagel_susie.ogg", "/assets/audio/bagel_susie.mp3"],
                volume: 0.5,
            })
            this.susie = e
            let n = new _t.Howl({
                src: ["/assets/audio/face.ogg", "/assets/audio/face.mp3"],
                volume: 0.5,
            })
                ; (this.face = n),
                    localStorage.getItem("rarecats-points") !== null &&
                    (this.pointsValue = localStorage.getItem("rarecats-points")),
                    this.summonCat(),
                    setTimeout(() => {
                        this.catTarget.classList.remove("hidden"),
                            (this.initializedValue = true),
                            window.requestAnimationFrame(this.catTick.bind(this))
                    }, 100)
        }
        summonCat() {
            let o = Math.floor(Math.random() * 1e3) + 1
            this.pullsValue >= 100
                ? this.hardReset()
                : o <= 700
                    ? (this.catTarget.setAttribute("src", "/assets/images/cat-001.gif"),
                        this.catTarget.setAttribute("data-rarecats-points-param", 10))
                    : o <= 879
                        ? (this.catTarget.setAttribute("src", "/assets/images/cat-002.gif"),
                            this.catTarget.setAttribute("data-rarecats-points-param", 50))
                        : o <= 959
                            ? (this.catTarget.setAttribute("src", "/assets/images/cat-005.gif"),
                                this.catTarget.setAttribute("data-rarecats-points-param", 250))
                            : o <= 989
                                ? (this.catTarget.setAttribute("src", "/assets/images/cat-006.gif"),
                                    this.catTarget.setAttribute("data-rarecats-points-param", 1e3))
                                : o <= 999
                                    ? (this.catTarget.setAttribute("src", "/assets/images/cat-007.gif"),
                                        this.catTarget.setAttribute("data-rarecats-points-param", 3e3))
                                    : this.initializedValue == false
                                        ? this.summonCat()
                                        : this.hardReset(),
                (this.xValue = Math.floor(Math.random() * (document.body.clientWidth - 200))),
                (this.yValue = Math.floor(Math.random() * (document.body.clientHeight - 200))),
                (this.horizontalValue = Math.round(Math.random()) ? 1 : -1),
                (this.verticalValue = Math.round(Math.random()) ? 1 : -1),
                this.updateCat()
        }
        clickCat(o) {
            this.catTarget.classList.contains("animate-caught") == false &&
                ((this.pullsValue += 1),
                    this.catTarget.classList.add("animate-caught"),
                    this.catTarget.classList.remove("cursor-pointer"),
                    (this.caughtValue = true),
                    "points" in o.params && o.params.points == parseInt(o.params.points)
                        ? (this.pointsValue += o.params.points)
                        : this.hardReset(),
                    setTimeout(() => {
                        this.catTarget.classList.remove("animate-caught"),
                            this.catTarget.classList.add("cursor-pointer"),
                            (this.caughtValue = false),
                            this.catTarget.removeAttribute("disabled"),
                            this.summonCat()
                    }, 1e3))
        }
        pointsValueChanged(o, t) {
            if (
                ((document.title = `${this.pointsValue} points`),
                    this.initializedValue == true && (localStorage.setItem("rarecats-points", this.pointsValue), o > t))
            ) {
                let e = o - t,
                    n = document.createElement("span")
                if (
                    (n.classList.add(
                        "absolute",
                        "w-24",
                        "h-12",
                        "pointer-events-none",
                        "text-2xl",
                        "text-white",
                        "text-center",
                        "font-pixel",
                        "text-center",
                        "z-5"
                    ),
                        this.yValue > 80
                            ? (n.classList.add("animate-toast"),
                                n.setAttribute("style", `left: ${this.xValue + 40}px; top: ${this.yValue + 20}px`))
                            : (n.classList.add("animate-toast-down"),
                                n.setAttribute("style", `left: ${this.xValue + 40}px; top: ${this.yValue + 160}px`)),
                        (n.innerHTML = `+${e}`),
                        this.containerTarget.append(n),
                        setTimeout(() => {
                            n.remove()
                        }, 1e3),
                        e >= 3e3
                            ? (this.ralsei.rate(0.8),
                                this.ralsei.play(),
                                this.ralsei.rate(0.81),
                                this.ralsei.play(),
                                this.sprinkle.rate(0.25),
                                this.sprinkle.play())
                            : e >= 1e3
                                ? (this.ralsei.rate(1), this.ralsei.play(), this.sprinkle.rate(0.5), this.sprinkle.play())
                                : e >= 250
                                    ? (this.susie.rate(1.3), this.susie.play())
                                    : e >= 50
                                        ? (this.sprinkle.rate(0.95), this.sprinkle.play())
                                        : e >= 10 && (this.sprinkle.rate(1), this.sprinkle.play()),
                        e > 3e3)
                )
                    this.hardReset()
                else if (e >= 1e3) {
                    let i = Math.floor(Math.random() * (document.body.clientWidth - 200)),
                        s = Math.floor(Math.random() * (document.body.clientHeight - 200))
                    this.windowTarget.setAttribute("style", `left: ${i}px; top: ${s}px`),
                        this.windowTarget.classList.add("animate-fade-in"),
                        this.windowTarget.classList.remove("hidden", "animate-fade-out"),
                        setTimeout(() => {
                            this.windowTarget.classList.remove("animate-fade-in"),
                                this.windowTarget.classList.add("animate-fade-out")
                        }, 3e3),
                        setTimeout(() => {
                            this.windowTarget.classList.add("hidden"),
                                this.windowTarget.classList.remove("animate-fade-out", "animate-fade-in")
                        }, 5e3)
                }
            }
        }
        catTick() {
            let o = Math.max(document.body.clientWidth - 130, 130),
                t = Math.max(document.body.clientHeight - 150, 150)
                ; (this.xValue >= o || this.xValue <= -60) && (this.horizontalValue = -this.horizontalValue),
                    this.xValue >= o && (this.xValue = o),
                    (this.yValue >= t || this.yValue <= -65) && (this.verticalValue = -this.verticalValue),
                    this.yValue >= t && (this.yValue = t),
                    (this.xValue += this.horizontalValue),
                    (this.yValue += this.verticalValue),
                    this.updateCat(),
                    window.requestAnimationFrame(this.catTick.bind(this))
        }
        updateCat() {
            this.caughtValue == false &&
                this.catTarget.setAttribute("style", `left: ${this.xValue}px; top: ${this.yValue}px`)
        }
        reset() {
            ; (this.pointsValue = 0), this.summonCat()
        }
        hardReset() {
            ; (this.pointsValue = 0),
                this.catTarget.setAttribute("src", "/assets/images/cat-009.gif"),
                this.catTarget.classList.add("animate-megazoom"),
                this.face.play(),
                setTimeout(this.fullReset.bind(this), 500)
        }
        fullReset() {
            this.catTarget.classList.remove("animate-megazoom"),
                this.summonCat(),
                (window.location.href = "/sweepstakes/")
        }
    }
    R(Nt, "targets", ["cat", "container", "window"]),
        R(Nt, "values", {
            initialized: { type: Boolean, default: false },
            points: { type: Number, default: 0 },
            pulls: { type: Number, default: 0 },
            horizontal: { type: Number, default: 1 },
            vertical: { type: Number, default: 1 },
            x: { type: Number, default: 0 },
            y: { type: Number, default: 0 },
            caught: { type: Boolean, default: false },
        })
    var Yn = {}
    J(Yn, { default: () => Xt })
    var An = Pt(Ze(), 1)
    var Xt = class extends V {
        connect() {
            this.locale = {
                en: { rumble: "You can never defeat us!!! Let's rumble!" },
                ja: {
                    rumble: "\u304A\u307E\u3048\u306B\u306F\u3000\u308F\u308C\u3089\u3092\u3000\u305F\u304A\u3059\u3053\u3068\u306F\u3000\u3067\u304D\u306C\uFF01\u3000\u3044\u304F\u305E\uFF01\uFF01",
                },
            }
            let o = new An.Howl({
                src: ["/assets/audio/slam.ogg", "/assets/audio/slam.mp3"],
                volume: 0.5,
            })
            this.slam = o
            let t = new An.Howl({
                src: ["/assets/audio/ma.ogg", "/assets/audio/ma.mp3"],
                volume: 0.5,
            })
            this.ma = t
        }
        start() {
            this.startedValue == false &&
                (this.slam.play(),
                    this.doorTarget.classList.add("hidden"),
                    this.squareTarget.classList.remove("hidden"),
                    window.requestAnimationFrame(this.moveTick.bind(this)),
                    setTimeout(() => {
                        this.clickedValue == false &&
                            (this.escapedTarget.classList.remove("hidden"),
                                (this.escapedValue = true),
                                this.squareTarget.classList.add("hidden"),
                                window.getSelection().removeAllRanges())
                    }, 5e3))
        }
        moveTick() {
            if (this.escapedValue == false && this.clickedValue == false) {
                let o = this.containerTarget.clientWidth / 2,
                    t = this.containerTarget.clientHeight / 2,
                    e = 250,
                    n = e * Math.cos(this.angleValue),
                    i = e * Math.sin(this.angleValue) * Math.cos(this.angleValue)
                    ; (this.angleValue += 0.02),
                        this.squareTarget.setAttribute(
                            "style",
                            `left: ${o + n - this.squareTarget.clientWidth / 2}px; top: ${t + i - this.squareTarget.clientHeight / 2
                            }px`
                        ),
                        window.requestAnimationFrame(this.moveTick.bind(this))
            }
        }
        click() {
            this.clickedValue == false &&
                ((this.clickedValue = true),
                    this.squareTarget.classList.add("animate-fly-off"),
                    this.squareTarget.classList.remove("cursor-pointer"),
                    this.ma.play(),
                    (document.title = this.locale[this.localeValue].rumble),
                    setTimeout(() => {
                        window.location.href = "/chapter3"
                    }, 3e3))
        }
        playMa() {
            this.ma.play()
        }
    }
    R(Xt, "targets", ["container", "door", "square", "escaped"]),
        R(Xt, "values", {
            clicked: { type: Boolean, default: false },
            escaped: { type: Boolean, default: false },
            started: { type: Boolean, default: false },
            angle: { type: Number, default: 0 },
            locale: { type: String, default: "en" },
        })
    var Jn = {}
    J(Jn, { default: () => Oe })
    var so = Pt(Ze(), 1)
    var Oe = class extends V {
        connect() {
            let o = new so.Howl({
                src: ["/assets/audio/chord.ogg", "/assets/audio/chord.mp3"],
                volume: 0.5,
            })
            this.sound = o
        }
        click(o) {
            this.clicksValue >= 3
                ? (window.location.href = "/window")
                : (o.preventDefault(), this.sound.play(), (this.clicksValue += 1))
        }
    }
    R(Oe, "values", { clicks: { type: Number, default: 0 } })
    var Hn = {}
    J(Hn, { default: () => Ce })
    var Te = Pt(lo(), 1)
    var Ce = class extends V {
        parallaxTargetConnected(o) {
            o.classList.add("parallax")
            let t = 10
            "distance" in o.dataset && (t = o.dataset.distance)
            let e = window.innerHeight / 200
            Te.create({
                elem: o,
                from: 0,
                to: "bottom-top",
                direct: true,
                props: { "--tw-translate-y": { from: 0, to: `-${e * t}px` } },
            }).start()
        }
        parafadeTargetConnected(o) {
            o.classList.add("parafade"),
                Te.create({
                    elem: o,
                    from: "top-bottom",
                    to: "top-middle",
                    direct: true,
                    props: { opacity: { from: 0, to: 1 } },
                }).start()
        }
        parashadowTargetConnected(o) {
            o.classList.add("parafade"),
                Te.create({
                    elem: o,
                    from: "top-bottom",
                    to: "middle-middle",
                    direct: true,
                    props: {
                        "--shadow-length": { from: "100px", to: "10px" },
                        "--shadow-y": { from: "100px", to: "10px" },
                        "--shadow-z": { from: "-100px", to: "-10px" },
                    },
                }).start()
        }
        scrollTo(o) {
            document.querySelector(o.params.element)
                ? document.querySelector(o.params.element).scrollIntoView({ behavior: "smooth" })
                : (window.location.href = `${window.location.origin}${o.params.element}`)
        }
    }
    R(Ce, "targets", ["parallax", "parafade"])
    var jn = {}
    J(jn, { default: () => Me })
    var Me = class extends V {
        connect() {
            this.appendStar(Math.floor(Math.random() * 10) + 450, Math.floor(Math.random() * 10) + 100, false),
                this.appendStar(Math.floor(Math.random() * 10) + 320, Math.floor(Math.random() * 5) + 105, false),
                this.appendStar(Math.floor(Math.random() * 10) + 480, Math.floor(Math.random() * 10) + 150, false),
                this.appendStar(Math.floor(Math.random() * 10) + 500, Math.floor(Math.random() * 10) + 350, false),
                this.appendStar(0 - (Math.floor(Math.random() * 10) + 450), Math.floor(Math.random() * 10) + 100, false),
                this.appendStar(0 - (Math.floor(Math.random() * 10) + 320), Math.floor(Math.random() * 5) + 105, false),
                this.appendStar(0 - (Math.floor(Math.random() * 10) + 480), Math.floor(Math.random() * 10) + 150, false),
                this.appendStar(0 - (Math.floor(Math.random() * 10) + 500), Math.floor(Math.random() * 10) + 325, false)
            for (var o = Math.floor(Math.random() * 6) + 4, t = 0; t < o; t++) {
                var e = Math.floor(Math.random() * 300) + 600 + t * 10,
                    n = Math.floor(Math.random() * 200) + 200 + t * 10,
                    i = false
                t < 2 && (i = true), t % 2 == 0 && (e = 0 - e - 20), this.appendStar(e, n, i)
            }
        }
        appendStar(o, t, e) {
            var n = 6
            e || (n = Math.floor(Math.random() * 5) + 1)
            var i = Math.floor(Math.random() * 6) + 1,
                s = Math.floor(Math.random() * 20) + 10
            t += s * 2
            var l = document.createElement("img")
            l.setAttribute("class", "absolute opacity-50 animate-pulse motion-safe:translate-y-0"),
                l.setAttribute("data-distance", s),
                l.setAttribute("data-scroll-target", "parallax"),
                l.setAttribute("src", `/assets/images/star${n}.png`),
                l.setAttribute("style", `margin-left: ${o}px; margin-top: ${t}px; animation-delay: -${i}s`),
                l.setAttribute("aria-hidden", "true"),
                this.containerTarget.append(l)
        }
    }
    R(Me, "targets", ["star", "container"])
    var Pn = {}
    J(Pn, { default: () => At })
    var At = class extends V {
        connect() {
            ; (this.locale = {
                en: {
                    unknown: "Unknown contact.",
                    error: "She never smiled?",
                    thank_you: "Thank you.",
                },
                ja: {
                    unknown: "\u4E0D\u660E\u306E\u9023\u7D61\u5148",
                    error: "\u5F7C\u5973\u306F\u4E8C\u5EA6\u3068\u7B11\u308F\u306A\u304B\u3063\u305F\uFF1F",
                    thank_you: "\u3042\u308A\u304C\u3068\u3046\u3002",
                },
            }),
                this.destroyForm()
        }
        clearForm() {
            if (this.hasFieldTarget) for (let o of this.fieldTargets) o.value = ""
        }
        destroyForm() {
            if (this.hasFieldTarget) for (let o of this.fieldTargets) o.remove()
            if (this.hasButtonTarget) for (let o of this.buttonTargets) o.remove()
        }
        checkInput() {
            this.destroyForm(), (this.feedbackTarget.innerHTML = this.locale[this.localeValue].thank_you)
        }
    }
    R(At, "targets", ["button", "form", "feedback", "field"]),
        R(At, "values", { locale: { type: String, default: "en" } })
    var Kn = {}
    J(Kn, { default: () => Yt })
    var Yt = class extends V {
        startDrawing(o) {
            this.drawingValue = true
        }
        stopDrawing(o) {
            this.drawingValue = false
        }
        draw(o) {
            if (this.drawingValue) {
                let t = document.elementFromPoint(o.clientX, o.clientY)
                if ("therapyTarget" in t.dataset && t.dataset.therapyTarget == "cover") {
                    let n = document.querySelectorAll(".revealed").length
                    if (
                        (t.classList.remove("z-3"),
                            t.classList.add("z-1", "revealed"),
                            this.treeTarget.setAttribute("style", `opacity: ${n / 300}`),
                            n > 300)
                    ) {
                        for (let i of this.coverTargets) i.classList.remove("z-3"), i.classList.add("z-1", "revealed")
                        this.treeTarget.classList.remove("pointer-events-none")
                    }
                }
                let e = document.createElement("span")
                if (
                    (e.classList.add(
                        "absolute",
                        "w-[8px]",
                        "h-[8px]",
                        "bg-white",
                        "pointer-events-none",
                        "select-none"
                    ),
                        this.revealingValue ? e.classList.add("z-1") : e.classList.add("z-4"),
                        e.setAttribute("data-therapy-target", "dot"),
                        e.setAttribute("style", `left: ${o.clientX}px; top: ${o.clientY}px`),
                        this.containerTarget.append(e),
                        this.dotTargets.length > 500)
                ) {
                    let n = this.dotTargets.length - 500
                    for (let i of this.dotTargets) if ((i.remove(), (n -= 1), n <= 0)) break
                }
                ; (this.dotsDrawnValue += 1),
                    this.revealingValue == false &&
                    this.dotsDrawnValue > 2500 &&
                    ((this.revealingValue = true),
                        this.treeTarget.classList.remove("hidden"),
                        this.coverboxTarget.classList.remove("hidden"),
                        this.treeTarget.setAttribute("style", "opacity: 0"))
            }
        }
    }
    R(Yt, "targets", ["container", "coverbox", "cover", "dot", "tree"]),
        R(Yt, "values", {
            drawing: { type: Boolean, default: false },
            dotsDrawn: { type: Number, default: 0 },
            revealing: { type: Boolean, default: false },
        })
    var $n = {}
    J($n, { default: () => Se })
    var Se = class extends V {
        connect() {
            for (let o of this.element.querySelectorAll("video")) o.setAttribute("data-video-target", "video")
        }
        playVideo(o) {
            this.hasVideoTarget &&
                this.hasPlayButtonTarget &&
                (this.videoTarget.play(),
                    this.videoTarget.setAttribute("controls", true),
                    this.playButtonTarget.classList.add("hidden"),
                    this.videoTarget.focus())
        }
        playExternalVideo(o) {
            this.hasContainerTarget &&
                (o.preventDefault(),
                    (this.containerTarget.innerHTML = `<iframe class="w-full aspect-video" src="https://www.youtube-nocookie.com/embed/${o.params.ytid}?autoplay=1" credentialless allowfullscreen referrerpolicy="no-referrer" sandbox="allow-scripts allow-same-origin" csp="sandbox allow-scripts allow-same-origin;" frameborder="0" allow="accelerometer 'none'; ambient-light-sensor 'none'; autoplay 'none'; battery 'none'; browsing-topics 'none'; camera 'none'; display-capture 'none'; domain-agent 'none'; document-domain 'none'; encrypted-media 'none'; execution-while-not-rendered 'none'; execution-while-out-of-viewport ''; gamepad 'none'; geolocation 'none'; gyroscope 'none'; hid 'none'; identity-credentials-get 'none'; idle-detection 'none'; local-fonts 'none'; magnetometer 'none'; microphone 'none'; midi 'none'; otp-credentials 'none'; payment 'none'; picture-in-picture 'none'; publickey-credentials-create 'none'; publickey-credentials-get 'none'; screen-wake-lock 'none'; serial 'none'; speaker-selection 'none'; usb 'none'; window-management 'none'; xr-spatial-tracking 'none'"></iframe>`))
        }
    }
    R(Se, "targets", ["container", "playButton", "video"])
    var Da = {
        "./controllers/audio_controller.js": On,
        "./controllers/chapter3_controller.js": In,
        "./controllers/countdown_controller.js": _n,
        "./controllers/particles_controller.js": Nn,
        "./controllers/rarecats_controller.js": Xn,
        "./controllers/romb_controller.js": Yn,
        "./controllers/roots_controller.js": Jn,
        "./controllers/scroll_controller.js": Hn,
        "./controllers/stars_controller.js": jn,
        "./controllers/thankyou_controller.js": Pn,
        "./controllers/therapy_controller.js": Kn,
        "./controllers/video_controller.js": $n,
    },
        co = Da
    K.bind("[data-fancybox]", {
        Toolbar: { display: { left: [], middle: [], right: ["close"] } },
        Thumbs: { type: "classic" },
        Hash: false,
    })
    window.Stimulus = ne.start()
    Stimulus.register("dialog", Ki)
    Object.entries(co).forEach(([o, t]) => {
        if (o.includes("_controller.") || o.includes("-controller.")) {
            let e = o
                .replace("./controllers/", "")
                .replace(/[_-]controller\..*$/, "")
                .replace(/_/g, "-")
                .replace(/\//g, "--")
            Stimulus.register(e, t.default)
        }
    })
})()
/*! Bundled license information:

howler/dist/howler.js:
  (*!
   *  howler.js v2.2.4
   *  howlerjs.com
   *
   *  (c) 2013-2020, James Simpson of GoldFire Studios
   *  goldfirestudios.com
   *
   *  MIT License
   *)
  (*!
   *  Spatial Plugin - Adds support for stereo and 3D audio where Web Audio is supported.
   *  
   *  howler.js v2.2.4
   *  howlerjs.com
   *
   *  (c) 2013-2020, James Simpson of GoldFire Studios
   *  goldfirestudios.com
   *
   *  MIT License
   *)
*/
