"use strict";
window.HyperSpace = function() {
    this.sprite = null;
    let h = PIXI.Texture.fromImage("hyperspace");
    this.sprite = new PIXI.Sprite(h)
}
,
window.HyperSpace.prototype = {
    sprite: null,
    initialize: function() {
        let h = PIXI.Texture.fromImage("hyperspace");
        this.sprite = new PIXI.Sprite(h)
    },
    show: function() {
        function d() {
            for (name in m)
                "game" != name && (m[name].visible = m[name].prevVisible,
                delete m[name].prevVisible);
            game.graphics.layers.game.removeChild(c.sprite),
            c.sprite.filters = null,
            Graphics.renderbackground()
        }
        let c = this
          , m = game.graphics.layers;
        (function() {
            for (name in m)
                "game" != name && (m[name].prevVisible = m[name].visible,
                m[name].visible = !1);
            c.sprite.width = game.screenX,
            c.sprite.height = game.screenY,
            game.graphics.layers.game.addChild(c.sprite)
        }
        )();
        let S = new PIXI.filters.ZoomBlurFilter(2,{
            x: game.halfScreenX,
            y: game.halfScreenY
        },0)
          , w = new PIXI.filters.AdjustmentFilter({
            gamma: 2,
            brightness: 2,
            alpha: 1
        })
          , A = function() {
            S.strength -= 0.03,
            1 < w.gamma && (w.gamma -= 0.02,
            w.brightness -= 0.02),
            0 < S.strength ? setTimeout(function() {
                A()
            }, 10) : (S.strength = 0,
            d())
        };
        this.sprite.filters = [S, w],
        A()
    }
};
function StarMash_2() {
    SWAM.replaceCSS(getFilePath("style.css"));
    let c = new SettingsProvider({
        nebulas: {
            blue: !0,
            green: !0,
            red: !0
        },
        asteroidLayers: 3,
        decorations: {
            stellar: !0,
            planets: !0,
            moons: !0,
            ships: !0
        }
    },function(S) {
        let w = S;
        if (game.graphics.layers.map.children[0].alpha = 0.8,
        game.graphics.layers.map.children[0].visible = w.nebulas.blue,
        game.graphics.layers.map.children[2].alpha = 0.8,
        game.graphics.layers.map.children[2].visible = w.nebulas.green,
        game.graphics.layers.map.children[4].alpha = 0.8,
        game.graphics.layers.map.children[4].visible = w.nebulas.red,
        SWAM.planet && (SWAM.planet.visible = w.decorations.planets),
        SWAM.ShipContainer && (SWAM.ShipContainer.visible = w.decorations.ships),
        SWAM.asteroids1 && SWAM.asteroids2 && SWAM.asteroids3) {
            var A = [SWAM.asteroids1, SWAM.asteroids2, SWAM.asteroids3];
            for (let f = 0; 3 > f; f++)
                A[f].visible = f < w.asteroidLayers
        }
        Graphics.renderbackground()
    }
    );
    c.root = "",
    c.title = "Mod Settings";
    let m = c.addSection("Background");
    m.addButton("Generate New Background", {
        click: function() {
            SWAM.RandomizeBackground()
        }
    }),
    m.addBoolean("nebulas.blue", "Blue nebulas"),
    m.addBoolean("nebulas.green", "Green nebulas"),
    m.addBoolean("nebulas.red", "Red nebulas"),
    m = c.addSection("Asteroid field"),
    m.addValuesField("asteroidLayers", "Visible layers", {
        0: 0,
        1: 1,
        2: 2,
        3: 3
    }),
    m = c.addSection("Decorative objects"),
    m.addBoolean("decorations.stellar", "Distant stellar objects"),
    m.addBoolean("decorations.planets", "Planets"),
    m.addBoolean("decorations.moons", "Moons"),
    m.addBoolean("decorations.ships", "Ships"),
    this.settingsProvider = c
}
StarMash_2.themeName = "StarMash v.2",
StarMash_2.author = "Bombita",
StarMash_2.version = SWAM_version,
StarMash_2.prototype.start = function() {
    function h() {
        let P = $("#regenerateBackground");
        if (0 == P.length) {
            var F = getTemplate("#regenerateBackground");
            P = $(F),
            $("body").append(P);
            let z = $("#btnRegenerate", P);
            z.click(function() {
                SWAM.RandomizeBackground()
            })
        }
        P.slideDown(),
        h.timer && clearInterval(h.timer);
        let V = $(".timerIndicator", P);
        h.width = 100,
        V.css("width", "100%"),
        h.timer = setInterval(function() {
            h.width--,
            V.animate({
                width: h.width + "%"
            }, 90),
            0 == h.width && (clearInterval(h.timer),
            delete h.timer,
            P.slideUp())
        }, 100)
    }
    function d() {
        function P(X) {
            for (let U = 0; 3 > U; U++)
                N[U].visible = X
        }
        function F(X) {
            for (let U = 0; 3 > U; U++)
                N[U].renderable = X
        }
        let O = game.graphics.layers.map
          , N = [O.children[1], O.children[3], O.children[5]];
        O.visible = !1,
        function() {
            for (let X = 0; 3 > X; X++) {
                O.children[2 * X].mask = null;
                let U = Tools.randInt(0, N.length - 1);
                O.children[2 * X].mask = N[U],
                SWAM.debug && console.log(`${O.children[2 * X].layerName}: ${N[U].layerName}`)
            }
            F(!0)
        }(),
        function() {
            P(!0);
            let X = config.mapWidth * game.scale - game.screenX / game.scale
              , U = config.mapHeight * game.scale - game.screenY / game.scale;
            for (let q = 0; 3 > q; q++)
                O.children[2 * q + 1].position.set(Tools.randInt(-X, 0), Tools.randInt(-U, 0));
            Graphics.renderbackground(),
            P(!1)
        }(),
        O.visible = !0;
        let I = 1 == Tools.randInt(0, 1);
        SWAM.MoveBackgroundTiles = I,
        F(!1),
        P(I),
        SWAM.debug && console.log("movable nebulas: " + I)
    }
    function c() {
        for (let z in T) {
            let O = T[z];
            O.scale = O.scale || 1;
            let N = Graphics.renderer
              , I = PIXI.Texture.fromImage(z)
              , X = null;
            for (let U in O.useMask && (X = PIXI.Texture.fromImage(z + "_Mask")),
            O.items) {
                let q = O.items[U]
                  , H = new PIXI.Texture(I,new PIXI.Rectangle(q[0] * O.scale,q[1] * O.scale,q[2] * O.scale,q[3] * O.scale))
                  , Q = new PIXI.Sprite(H);
                Q.scale.set(O.resultScale, O.resultScale);
                var P = null;
                if (O.useMask) {
                    var F = O.maskScale || 1
                      , V = new PIXI.Texture(X,new PIXI.Rectangle(q[0] * O.scale / F,q[1] * O.scale / F,q[2] * O.scale / F,q[3] * O.scale / F))
                      , P = new PIXI.Sprite(V);
                    P.scale.set(F, F),
                    Q.addChild(P),
                    Q.filters = [new PIXI.SpriteMaskFilter(P)],
                    P.position.set(-q[0] * O.scale, -q[1] * O.scale)
                }
                let j = PIXI.RenderTexture.create(Q.width, Q.height);
                N.render(Q, j, !0),
                SWAM.Textures[U] = j
            }
        }
    }
    function m(P, F) {
        let V = SWAM.Textures[P]
          , z = new PIXI.Sprite(V);
        return "undefined" == typeof F && (F = {}),
        z.distanceFactor = F.distanceFactor ? F.distanceFactor : [1, 1],
        z.basePosition = F.basePosition ? F.basePosition : [0, 0],
        F.position && z.position.set(F.position[0], F.position[1]),
        F.anchor && z.anchor.set(F.anchor[0], F.anchor[1]),
        F.pivot && z.pivot.set(F.pivot[0], F.pivot[1]),
        F.scale && (Array.isArray(F.scale) ? z.scale.set(F.scale[0], F.scale[1]) : z.scale.set(F.scale)),
        F.rotation && (z.rotation = F.rotation),
        F.alpha && (z.alpha = F.alpha),
        F.blend && (z.blendMode = PIXI.BLEND_MODES[F.blend]),
        F.tint && (z.tint = F.tint),
        F.mask && (z.mask = F.mask),
        F.visible && (z.visible = F.visible),
        F.container && F.container.addChild(z),
        z
    }
    function S(P, F) {
        "undefined" == typeof F && (F = {});
        let V = m(P, F);
        return V.distanceFactor = F.distanceFactor ? F.distanceFactor : [1, 1],
        V.basePosition = F.basePosition ? F.basePosition : [0, 0],
        V.update = function() {
            let N = Graphics.getCamera()
              , I = N.x + (V.basePosition[0] - N.x) / V.distanceFactor[0]
              , X = N.y + (V.basePosition[1] - N.y) / V.distanceFactor[1];
            V.position.set(I, X)
        }
        ,
        V
    }
    function w() {
        function P(V) {
            V = V || {},
            V.count = V.count || 12,
            V.x = V.x || [-14000, -10000],
            V.y = V.y || [-1000, 1000],
            V.radius = V.radius || [5000, 13000],
            V.baseDistanceFactor = V.baseDistanceFactor || 8,
            V.textures = V.textures || T.ImperialShips.items;
            var z = V.count
              , O = [];
            for (let I in V.textures)
                O.push(I);
            let N = 2 * Math.PI / z;
            for (let I = 0, X = 0; I < z; I++,
            X += N) {
                let U = Tools.randInt(V.radius[0], V.radius[1])
                  , q = Tools.randInt(V.x[0], V.x[1])
                  , H = Tools.randInt(V.y[0], V.y[1])
                  , Q = f(q, H, U, X);
                q = Q.x,
                H = Q.y;
                let j = Tools.rand(0.2, 0.85)
                  , E = 0.5 * (1 / (j / 0.85)) + 0.5
                  , W = O[Tools.randInt(0, O.length - 1)]
                  , _ = S(W, {
                    distanceFactor: [V.baseDistanceFactor * E, V.baseDistanceFactor * E],
                    scale: [j, j],
                    basePosition: [q, H],
                    position: [q, H],
                    anchor: [0.5, 0.5]
                });
                _.textureName = W,
                _.angleUsed = X,
                SWAM.Ships.push(_)
            }
        }
        var F = SWAM.ShipContainer;
        null == F ? (F = new PIXI.Container,
        F.scale.set(game.scale, game.scale),
        game.graphics.layers.map.addChildAt(F, D()),
        SWAM.ShipContainer = F) : (F.removeChildren(),
        SWAM.Ships = []),
        P({
            count: 12,
            x: [-17000, -13000]
        }),
        P({
            count: 16,
            x: [13000, 17000],
            radius: [5000, 10000],
            textures: T.RebelShips.items
        }),
        SWAM.Ships.sort(function(V, z) {
            return z.distanceFactor[0] - V.distanceFactor[0]
        });
        for (let V of SWAM.Ships)
            F.addChild(V)
    }
    function A() {
        let P = Graphics.getCamera()
          , F = P.x - game.halfScreenX / game.scale
          , V = P.y - game.halfScreenY / game.scale;
        return {
            x: F,
            y: V
        }
    }
    function f(P, F, V, z) {
        let O = V * Math.cos(z) + P
          , N = V * Math.sin(z) + F;
        return {
            x: O,
            y: N
        }
    }
    function D() {
        let P = game.graphics.layers.map
          , F = game.graphics.layers.doodads
          , V = 0;
        for (var z = 0; z < P.children.length; z++)
            P.children[z] == F && (V = z);
        return V
    }
    function C(P, F, V) {
        var z = Graphics.renderer.width
          , O = Graphics.renderer.height;
        let N = Textures.tile(P, z, O);
        return N.layerName = F,
        game.graphics.layers.map.addChildAt(N, D()),
        N.tileScale.set(V, V),
        N
    }
    function G(P=-1) {
        let V = [];
        for (let N in B)
            V.push(N);
        let z = Tools.randInt(0, V.length - 1);
        0 <= P && P < V.length && (z = P);
        let O = new PIXI.loaders.Loader;
        O.add(V[z], B[V[z]].texture),
        O.add(V[z] + "_Mask", B[V[z]].mask),
        O.load(function() {
            let N = M(Graphics.renderer, V[z]);
            N.layerName = "planet",
            N.scaleModifier = Tools.rand(0.1, 0.65),
            N.scale.set(0.5 * N.scaleModifier, 0.5 * N.scaleModifier);
            let I = 4 * N.scaleModifier;
            N.basePosition = [Tools.randInt(-25000, 7e4), Tools.randInt(-2e4 * I, 4e4 * I)],
            N.distanceFactor = [30, 30],
            SWAM.debug && (console.log("planet: " + V[z]),
            console.log("planet scale: " + N.scale.x.toFixed(2) + "    modifier: " + N.scaleModifier.toFixed(2)),
            console.log("planet pos: " + N.basePosition[0] + ", " + N.basePosition[1])),
            N.update = function(U, q) {
                let H = (U + N.basePosition[0] * game.scale) / N.distanceFactor[0]
                  , Q = (q + N.basePosition[1] * game.scale) / N.distanceFactor[1];
                N.position.set(H, Q)
            }
            ,
            null != SWAM.planet && game.graphics.layers.map.removeChild(SWAM.planet),
            SWAM.planet = N,
            game.graphics.layers.map.addChildAt(SWAM.planet, 6);
            let X = A();
            N.update(-X.x * game.scale, -X.y * game.scale),
            SWAM.loadSettings()
        })
    }
    function M(P, F) {
        var V = PIXI.Texture.fromImage(F)
          , z = new PIXI.Sprite(V)
          , O = PIXI.Sprite.fromImage(F + "_Mask");
        O.scale.set(1, 1);
        let N = PIXI.RenderTexture.create(2 * z.width, 2 * z.height)
          , I = new PIXI.Sprite(N);
        return z.addChild(O),
        z.filters = [new PIXI.SpriteMaskFilter(O)],
        z.scale.set(2, 2),
        z.position.set(0, 0),
        P.render(z, N),
        I.update = k,
        I
    }
    function k() {
        var V = SWAM.planet;
        let z = Graphics.getCamera()
          , O = game.halfScreenX / game.scale
          , N = game.halfScreenY / game.scale
          , I = z.x - O + 16384
          , X = game.screenX - V.width
          , U = config.mapWidth - game.screenX / game.scale
          , H = z.y + 8192
          , Q = 0;
        if (5e3 > H)
            Q = game.screenY;
        else {
            let j = config.mapHeight - N - 5e3;
            Q = game.screenY - V.height * (H - 5e3) / j
        }
        V.position.set(I * X / U, Q)
    }
    config.overdraw = 0,
    config.overdrawOptimize = !0,
    game.graphics.layers.shadows.visible = !1,
    game.graphics.layers.smoke.visible = !1,
    StarMash_2.addGraphicsSetButton(),
    SWAM.ShipContainer = null,
    SWAM.Ships = [],
    SWAM.Planets = [],
    SWAM.Moons = [],
    SWAM.Stellar = [],
    SWAM.Textures = {};
    let T = {
        ImperialShips: {
            scale: 1,
            resultScale: 0.5,
            useMask: !0,
            maskScale: 2,
            items: {
                ISD_01: [0, 0, 1700, 583],
                ISD_02: [0, 2017, 1250, 803],
                ISD_03: [1701, 0, 1414, 741],
                ISD_04: [0, 1288, 1418, 728],
                ISD_05: [1419, 1566, 1109, 738],
                ISD_06: [1251, 2305, 913, 523],
                ISD_07: [1463, 742, 1409, 575],
                ISD_08: [0, 584, 1462, 703],
                Dread_01: [0, 2821, 925, 294],
                Dread_02: [2545, 1318, 657, 505],
                Dread_03: [1419, 1318, 1125, 247],
                Dread_04: [926, 2829, 711, 348]
            }
        },
        RebelShips: {
            scale: 0.5,
            resultScale: 1,
            useMask: !0,
            maskScale: 2,
            items: {
                CR90_1: [0, 2013, 591, 293],
                CR90_2: [0, 2307, 553, 180],
                CR90_3: [2911, 1381, 604, 214],
                CR90_4: [2038, 2005, 417, 407],
                CR90_5: [554, 2307, 402, 237],
                GR75_1: [592, 2013, 508, 264],
                GR75_2: [2467, 492, 738, 207],
                GR75_3: [2911, 1596, 601, 248],
                Liberty_1: [0, 1680, 1115, 332],
                Liberty_2: [1694, 0, 960, 464],
                Liberty_3: [1553, 465, 913, 537],
                M80_1: [0, 1369, 1515, 310],
                M80_2: [0, 462, 1552, 394],
                MonCalamari_1: [0, 0, 1693, 461],
                MonCalamari_2: [0, 857, 1547, 511],
                NebulonB1_1: [1548, 1003, 813, 433],
                NebulonB1_2: [1617, 1970, 420, 578],
                NebulonB1_3: [2655, 0, 794, 491],
                NebulonB1_4: [2296, 1437, 614, 567],
                NebulonB1_5: [1516, 1437, 779, 532],
                NebulonB2_1: [1116, 1970, 500, 660],
                NebulonC_1: [2467, 700, 680, 680]
            }
        }
    }
      , B = {};
    for (let F, P = 2; 12 >= P; P++)
        F = ("0" + P).slice(-2),
        B["Planet" + F] = {
            texture: getFilePath("planets/planet" + F + ".jpg"),
            mask: getFilePath("planets/planet" + F + "-mask.jpg")
        };
    let R = new PIXI.loaders.Loader;
    R.add("hyperspace", getFilePath("hyperspace.jpg")),
    R.add("ImperialShips", getFilePath("ships/ships1.jpg")),
    R.add("ImperialShips_Mask", getFilePath("ships/ships1-mask-50.jpg")),
    R.add("RebelShips", getFilePath("ships/RebelShips1.jpg")),
    R.add("RebelShips_Mask", getFilePath("ships/RebelShips-mask.jpg")),
    R.load(()=>{
        c(),
        SWAM.RandomizeBackground(),
        SWAM.asteroids3 = C("asteroids1", "asteroids3", game.scale / 3),
        SWAM.asteroids2 = C("asteroids2", "asteroids2", game.scale),
        SWAM.asteroids1 = C("asteroids1", "asteroids1", game.scale),
        SWAM.hyperSpace = new HyperSpace,
        SWAM.loadSettings(),
        Graphics.setCamera(0, 0)
    }
    ),
    SWAM.RandomizeBackground = function(P=-1) {
        h(),
        d(),
        G(P),
        w()
    }
    ,
    SWAM.debug && (SWAM.ShowRegenerateButton = h),
    SWAM.MoveBackgroundTiles = !0,
    SWAM.debug && (SWAM.createShips = w),
    SWAM.BackgroundFactor = 100,
    SWAM.resizeLayers = function(P, F) {
        let V = P / game.scale
          , z = F / game.scale;
        SWAM.planet,
        SWAM.ShipContainer && SWAM.ShipContainer.scale.set(game.scale, game.scale),
        SWAM.asteroids1 && (SWAM.asteroids1.width = P,
        SWAM.asteroids1.height = F),
        SWAM.asteroids2 && (SWAM.asteroids2.width = P,
        SWAM.asteroids2.height = F),
        SWAM.asteroids3 && (SWAM.asteroids3.width = P,
        SWAM.asteroids3.height = F)
    }
    ,
    SWAM.doUpdates = !0,
    SWAM.updateLayers = function(P, F) {
        if (SWAM.doUpdates && SWAM.Settings && (SWAM.Settings.themes.StarMash_2.decorations.planets && this.planet && this.planet.update(P, F),
        0 < SWAM.Settings.themes.StarMash_2.asteroidLayers && this.updateAsteroids(P, F),
        SWAM.Settings.themes.StarMash_2.decorations.ships && SWAM.ShipContainer && (SWAM.ShipContainer.position.set(P, F),
        SWAM.Ships)))
            for (let z in SWAM.Ships)
                SWAM.Ships[z].update(P, F)
    }
    ,
    SWAM.updateAsteroids = function(P, F) {
        SWAM.asteroids1 && SWAM.asteroids1.tilePosition.set(P / 2, F / 2),
        SWAM.asteroids2 && SWAM.asteroids2.tilePosition.set(P / 4, F / 4),
        SWAM.asteroids3 && SWAM.asteroids3.tilePosition.set(P / 6, F / 6)
    }
    ,
    SWAM.on("playerAdded", StarMash_2.overridePlayerMethods),
    SWAM.on("mobAdded", StarMash_2.mobAdded),
    SWAM.on("scoreboardUpdate", StarMash_2.onScoreboardUpdate),
    SWAM.on("aircraftSelected", StarMash_2.aircraftSelected)
}
,
StarMash_2.addGraphicsSetButton = function() {
    const h = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAC/VBMVEUAAAD////////////////////////+/v4LCwv///8ODg7//////////////////////////////v59fHz///////////////8VFRX5+fn//v7//v7///////8SEhL////////////++vr///8bGxsUFBQbGxsuLi7///////////8gICA0NDRcXFxAQED////////SCQkxMTEmJiZBQUFiYmKwsLDa2trOzs7q6uqlpaX////////9/f3////KCwsuLi47OjpUVFRQUFDhV1eBgYFsbGzupqa8vLzS0tLk5OTw8PDl5eX////////////79fXskpLxCgrbCQnOFxfZGRncFBT0GxsqKiraJyf1NzcgICBGRkbjQEDUPT3VVlZDQ0PYZWWHh4fqjo6hBQVHR0f09PTBCgryvb3R0dH43d31xcX+5uY5OTn////uAwPDERG6Cgq/FxfVDw/aIiJPT0/eTEzJHBw5OTncdHR0dHSCgoLULS3WPT1RUVGvAgJ0dHS+vr7ExMTyycn7h4fTLy/sJCT75+fOVFRra2vmenqgoKCampr55ub88fH///+Tk5PY2NioqKjpenrGxsbzwMDQQUH4+PjvWlr209Pr6+v86urs7OzEDAzlDQ3mICDOS0vXKirha2v2YWEzMzODg4PiRESTk5NcWlqhoaHBAgKmpqbreXnPFRXxsbGDg4OzDg5qamrsb2/ehYXuvLzLHh61tbX67e3oVFTmRkZUVFTgVVX2zMy8Gxv6mJjzt7ewsLBpaWn30ND8sLDyra323991dXXtoaHtQkLdYGD////0r6+Ghob////xp6d8fHz56OhVVVXuVFT0w8PafX30zs7toqLrOzvKysrvtbXrnZ3hd3fa2tr1qqq7u7vorKz2trbbaGjtwcHwwcH71dXdfHz12Njzk5P85eUHBwcJCQncAADfAQHIAADtAADqAADmAADRAADiAADWAQHZAADMAADFAADDAQHAAQHxAADKAADOAQG6AADkAADTAQHFcXUqAAAA6XRSTlMAAgUJDzASwP4e/VozIUgYOl4s3VNAPDb6wGRQQiT7Pg1NHBX49/XockpF8u/m11Um/PLy7eHQx8PBiYFubGf58+/o5uXc3NLKycXDt5CHencx/Pv49/f29PHu7Ovq6eXi4drX08zCsKqmpZeOjCn++fj39vTp6Ojk3dzb2tbU09LNzMnJw8O8vLKwo52amZaVlJCNioeHenFwbWVi+/r16OPg3Nzb2NfW09PSz87Nzc3My8jGxsTDwsLAvr29vLu3trOxsa+sqaalo6KhoJqak5GMiIeDgX54eHh2cG9ubGZlYltPTkJCOwDD0BUAAARNSURBVDjLZZRldBNBFIXTrCfZjbunSZqkCVBKgQrFpS20FHd3d3d3d3d3d3d3d99NGwhV2sJhdgsFDu/fzPnOvfe8N294f1VICASHEiQhhiF+CO+/CuGKD6EEIlGqEBIFFFd/I3w+BEF8Pkyo9Y/HP9CrSRic2JsiDCAWGEVhGLaJFPeH5a++W1xkg7krC/Qb40OwmCBTU20EYp0/PC8r2GK+HiFsqakgHcoas0IgiUz0esF7GUKV61Q+PSv441wchfT4+HCRSIaUCIVCWDOURJRP9y/4oDYs7TqxJYAGTOy61KD+tGjCnRdClREFUnwLIaKeDBz/1mB4M2ng4Or1siKqt218+JVS9e7SrshpQgkJ83mQGHEvHlZ+rt7gude7oFfLeln1q9TPrDvXYKa6ygVh8xQiMcSDSxh0R/OHL7aqVC8n9cnNKZ8XEZHR4NBziTqmhtaHjyjnMcI8sVp4o29wis6DIJRrb6+c9Lz8YN1ttSmkO16yaiXcMVUoEvOMVO0NGX0v6swlSLV0RuucbJC8ygydpLsGZxh7I1OxJUqShwivNsjo10knIUKNVMq+5dnpeRE7Yq3dffKSDNOsdEnHHLeMpyq3x5/Zr1O8xGYRq3VdWgCo8Zlyt33RmFzAVNJWxScrRDxPSvM0f/2TLqUNQmXC6azfgC435VptmTYavGJiDUExoYRnTV6Z5q/bNtZqhNEeiluDc7PTq3TrHF22akUBY6qGlQ1vKjXzFLVWfE3zV+kCQhEioJSbk31ZGjtKQ9MMw1TGaoY5pEpe8Vpfvqf5G1RPFqrUbtf5VQW5HWXW2q1oDiqlrTlIIDUA6PMXINX8WHK8Lm7m2D4FHW2I+3+oDqD8mc3HXp955WDLgo4IohTGVjP9Y6dPbviZNcxovKZ62xa9j+v0emlK5+gxci/+JzgV26Qna5iZEVGvfG67TbMXLpy9O1KOdWBbUCpxNNcCpWttzwBnGMxPb0ebvKc6e020JiqJbWZ/7VDmNGimWneiTiDwmTUMtmNAkhoJApBa4BtaOBYNO5Yeim5NvgUCrOFIwND2MtGNaFA4N+AKhQMmzHHj6nxjDUcyrJA3CWuG01xVkFdiNNxTQWWsFKC2V2QAJeiPYVECDokq3cHHFD46CyGJP9vwW2ACNrqyhmFwr3x9RaBkKlUaw4qeLx8tQbnGNdwSVQZLqlrKXmjk8A5JxBKH4OG/FiEECpXpU6aEMa0OaLHoNpHACrfLy2BYjcp002tCM7dSYKfEiLV4zDrGOapsknazTyOotFHboezOcDpsltDMLSe7nRabUaJ/dsTBOKO2JiRE2scklK4WTpvaP1KoAAOEOApCSREljGnvxBlnBQHeKJxmHMVmSd1qYyHzmyJkKuuymAvtw5xOuzOy2OSYZXozQqBFDKCAZSiJqCiFND7O5YqLlxZ3mxGjGP798RSJwWJSJpIoPRTlMahEMvKvT/En4U+imSkuVtwAAAAASUVORK5CYII=')"
      , m = [h, "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAACi1BMVEUAAAD///8LCwv///////8ODg4QEBD////7+/sWFhb///////////8NDQ3///82Njb///////////////////////8ZGRn///////////////////////////8UFBQUFBQmJiZhYWH///////////////////////8cHBwaGhouLi4xMTFHR0dpaWl7e3v///8fHx8fHx8uLi5ubm5+fn7BwcHS0tLv7+/4+Pj///////////////////////////8gICAgICBXV1dkZGSAgICCgoLb29vo6Ojx8fGmpqb///////////////////8YGBgoKCgzMzM/Pz8zMzMqKipLS0tTU1NRUVFbW1tDQ0N5eXkxMTGEhISKioq9vb3Y2NhOTk7l5eXl5eX09PT9/f3///////////////////////8SEhIVFRUrKysiIiI7OztDQ0MkJCRPT091dXVjY2NqamqpqalHR0e0tLS6urrMzMxISEjh4eG+vr7z8/P19fXOzs52dnadnZ2vr6////8aGhpdXV05OTkwMDAqKipOTk5cXFxFRUWSkpI6OjpVVVWfn5+lpaVwcHA/Pz+tra2qqqqvr6+BgYFZWVloaGhnZ2fs7OzOzs7S0tJVVVXt7e3a2tqwsLDR0dHPz89+fn7R0dGKioq6urqWlpba2tqurq6oqKj+/v7AwMD////k5OTe3t74+Pjc3Nz////4+Pj////r6+v19fXq6urw8PD///////8jIyM7Ozs7OztxcXF0dHRbW1tPT094eHjFxcWxsbG1tbW8vLzIyMhoaGhra2tra2ufn5+hoaGYmJicnJzMzMzS0tKSkpLDw8PIyMjKysrPz88HBwcKCgrXv00AAAAA13RSTlMAv/4DAf39IcD6Qgk9/grwPzstJBYS9F5aU0hGHQ/7+PXkV086MRgH+Pjz8uvi3Tf49Ojg3MzIw8BnXDQyLyoU8u3n49zbxsPCilVSUEoN+fTv7evr6ujo5ePd3dvZzcfGxbd+eXNiXyYOAvr19PDv7e3p393Z0dDPzsrKxcXCwL6skoNM8eXk5OPg3tvX1tXU09PT0dHQzs7Nx8PDwL+8uLitp6ajoJWUkpGQhYOBgX12b25ubW1lY18jH/Xh4Nva1tXQy8XEwsC2tbKkop6cmZeVi4l4dpOI3Z0AAAP8SURBVDjLdVRnVxNREN23cVt6JwkhhSRAAoTQkSBGIDE0QVREBRQ79t4Vxd5777333nvvdefnuG+DkuM5vi/75Z6Zu3MLEXs9JLIkPVNaopEmWiyJUk2wlElJkkl6EHFvQmo/PdNLYzEn9Lw5Zsz1nuPMFrnnnr5fKoZ1j7GWalbcXb5sYY7RXmccOHfZ8jsuudZqwMO6MEoDU5JoqhyxEvi6egXpCABpnNtZbMm611vZhZIoe+uyXNcOTeLt67cuWODw5hfMmZ0N9hG/qjXj9THUBJlB5zZXDoNJ294UsjvLbXTTFjZ6cHc2rDmTLB/fWyYRlqUmMe6qzrX8kJcdaH+Lg+Z5OtC8CLGv18H0Uya5zpDag5D0s2ZVncsB53BU2Nzg5cXnbfC3oUWPyemfTW6mXULI9FrXlUeQyaL8Ro7nwZc7U6UAsGXMQ8hPrflhLkmREe2Muuc+yCjMz1XhGeQMFjlpHgDSM+cXrYLNNxJ1SYS+V/XpbMhoxhD8VEvQIIUwEcMqyoD7mFySQtzX3N6j8KWBsIHCoLThfX0ggCgbCZA2md5wS80QpYkXQ4GdgwEcQ5003je/AH+oMn86QMaO9LrztVrC4zoBziKngsxEbGYdT/c/eqy/jeea9gu0oZENw7vqIJFVNQLmRAeR1NDIEtTyYPOXUaPP7nX42aJIC0dObWtVbEp2E3LTMNtiVMGBQjU0v+/xUWOra8aNPnl4QXgqDXQuOhDqU6wm1MV9pixF5RSAQGTWhbFSTy918aVtnPiDg9HIAfYEKSFNMA48gspIDOIHXK7xWK3aFVeH8CJoGjtyNfUfUO2/oPh15PrYOtOl2RP/rMsR1mHidpE4mT6zFROvcWHiL/wqUiQ+RSCOT0DOWYJPMDyKNjqefsUnqM9jOyLNHNnQ1krhE3hqTkA5Kx4T5XrFYw4QjuksRHkUzCgKw1tzEMuSHdhVBlCflzkR0+2SpSmMZZmXbseyMKLAAQDgaIgJPBkLreCwwD5RYMEqZmyVChUAYPVVUTaD5MXn8zcC9wFbpZ2RCqYbhE2HUdQMhJyiZyaXzxNM9wybLmbfh9i+rYM5ALJ/XniqMImetgsJ1HO+C/ZVikFIFoIwK4IKKxrSYos41cxFqO0JGfpk0jBJEiFSBsad3JkDQ14Vob4tDkrg7M2LILR4Hd8nFqkJceE0Pl8aZbc02ejGjWzHwd0hfu03HE6lBFcBjrkbxxyMs7YWFOCY75gd4icu/Nkd81hhBC2myoUrSQj4aLI+mwf79jMJtVk6XBh/q8dg1cpx9cwdaEzzGqdvf195x6XW3jco4wtKLDF5d4lV1co9upT2WInF91gKUxrsqkN5UBtfh78BLbSeZWMjzYgAAAAASUVORK5CYII=')", "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAADAFBMVEUAAAD////////////////////////////////////++/v////////////////////////////////////////////////////////////////////vAwP////////////////////////////////////////////////////zBATICgr////////////////////dBATFBATqAwPRCgrqDAzXDw/oHR36iIj64OD////95OT//////////////////f3////////jBQXXBgbBBQXNEhLFERHdFBT0GBjbGBjUFBTaJCT1JCTTPT32QEDhQEDqSkrbSUnYUlL0bW3wp6f4s7Pvubn//////Pz////yo6P////////////TAgLSBwfnBgbzCQntCQm6CAjxDQ3cCAjvGBjQHBzAHBy7EBDgKCjwODjuJSXtOjriVFTbWFjSV1f0T0/abm7zYmLjdnbfPT3mjo7nbW30sLDyycn66en75+f40NDpWVn8sLD31tb3xcX////4yMj////0oqL5x8f55eX88fH0wMD55ub+6+vwdHTzwMDfQkL////+8vLuq6v98vL209PvsbH88PDvwcHoh4f539/ohYXvoKDMGxvVKSnRLCzqJCT1MzPyNDTFJSXOQkLrFRXgTEzOS0voDg7oQEDlW1vXKirMEhLXYmLYZGTha2vqGxvTMzPUQkLsh4fuLy/UJyfulpbqoaHrqqrXODj6enrreXn2oKDwu7vehYXehYXVMzPuvLzLHh7oVFTmRkb519fQLCzpICDPWVn6mJjzt7f3goLNT0/4o6P0cnLkdHT32tr5wcH239/toaHtQkLtwcH0r6/jfn7uVFT80dH0w8PafX33np7NODj++/v0zs7hd3fvXl784ODuVlb99fX85ubbaGj71dXIAADLAADCAADpAAC6AADfAADQAADkAADaAADXAAC/AADFAADmAAC3AAC1AADcAADrAAC8AADwAADtAADhAADNAADUAADuAADSAADyAABVO9ozAAAA5nRSTlMAAhAIBB4xBjoSGgxkSTdDNVJPHGE8LywlCnJM/lhVRz4rIRaIXUAoIxT++pCNg3wi/v7++/r59sihlI9ubGpbUUYY/v39+fn49/f39PPt6+vp6ebX0a+ql3t3dWdZJv79/fz8/Pr69/b29u/u7uvm5ePi39/d3dfRzMnEvLu6sa6ppKGfnZybmZmWjYyHhICAfHdwaWJeSD4yMPby8fHv7uzr6ejo6Ofk4+Pi4eDf3dzZ2dbU09DQz8/OzcnIx8bGwsLBv769vLu7u7e3trW1r6mmpaKOjIqIh4aEg4N2dXNuaGdlT3CF9PkAAARHSURBVDjLZZRldNpQGIZDQkIIJLhDcVtXmUu9c3d3d3d3d3d3d3d3d/cChQLtWlrWdtsNbO3O2ffv3vOc93mTe+6F/hkGA4GNIgNqhBEmA/pvGKFhImxUilskUgMbUKH5F2GyEARhsWCUL1x0flEyZYDBCuwwizCAcGA2G+bAIkzw7kD+rpcRfBEc3iryMhGYQGNXryJQqWreQYejw/B5QgwlVq2ORQm2IkwxQBM99vXNCj2mTWwRmebwdGieQGLWFfM/YTKDXcGkGRZswCzvL85fSfGWzRo7EEBbx07/wuOv/HDtOY9vsyMMIOOgGNlm99XlPN7y25uGHa/uKNvsUJ/LSy2Sb4+3z1VRsTCLASGpUnLJkchnQh7vVe/0Gk16OuoMqO3tPpenI9vs3/I6mS/iMCC4PY87Pv/EEpVEsvR6L3/pSEfZjr6al9rgVMqy8a7DH1UyOwsiqKRpdTz3PqdgUq3yXA1nmiPfU/XUYlIq05mnlStzl6tDFZCcXDy8oPwjrq59LGWeuceZCZoPmMnFDbG4eVa/QL8XAj0MYUlPa/vqtuDiqF1OxlyIBFDHUQuEVjvBN0/vH+hyi0ulQpKEkaV8dSe1xQlOKsWdWB9AaycmgpWRL57UN6gerOShUEqrHaW8tW8qLSIFLNPM3gt8jSuZpWwFgSc8WB9U14tW2SBhdAV3Tvejb1VyGNYLZg8B0MAZ7aRs2EbGnC4XzOscJbBCgqhyP9zenZVAKRGWNGOI35nZpJKYj6KUuNJQVzCvREmNHooo2SnDnVOzmSlJQpHKh9tynZn177dWURJN9KgKNFRZIwNQmawMt7fhOFOiOL7y6N7pfmfkmZZKcdvocY2yQlA7GuriyvqR4204emrLyWMGZafn+p2Nx0xuOfVKoyoZrgCAgC7Z1CPgAsKqdfcdG7G5a/Z3QJWuP6LZsD6l3AAqLFEywgqRCzaqXbSwoGz1GtXSvwPK7yxdvU55n9edkRUorGUSyiGLcqg6SAt9P/PTnH6ayvXTZxOG1A1itAaIz73RrZAWen0eR5ozNz07G0QBqMCb8yPLpW4aLyEgqyBuQ15hICT0ODKdubQQRHl++mioR3MzZodQXXzFznmFf4WZQBiKyqehjDKDF5JyDsSWRcxp8CsvSH8hENK1QCvnn1IVmnMpAoEUIrzthHq/wrUKAEULgY8u5a7StBUph5kQC26vVVas9W+tcBTwlWoUp8GMCANcO6NMGHOyFhAW1wpHVW04RYyjHCZ9gRUEJmhVsZ4a1ApTQEhHlW08hWuxgRsVego4IkyonNCgW5mivwWiqq0ZGSfWydk0E6YIWQp3TsW+5TpVoWulla7WtdegFq01uI2NFD8rCqMcFyTE3Wnav0LN8uV7rmty9slCsRZDQ64iCoFFeolQHB9jioqKMkW3Tmyn5cuNnD9McRhbZOXrtEJBhCBZxcOlttTiR/E3AYEOqmgNZcgAAAAASUVORK5CYII=')"];
    game.chosenGraphicsSet = -1;
    let S = $("<div class=\"\" style=\"position: relative; width: 44px; height: 44px; cursor: pointer; background-color: rgba(0, 0, 0, 0.3); background-repeat: no-repeat; background-position: center; display: none;\" id=\"graphicsSet\" cgs= \"-1\" title= \"Switch style between Imperial / Rebel / Random\" ></div > ").css("background-image", h).click(function() {
        if (2 != game.gameType) {
            let A = parseInt($(S).attr("cgs"));
            A++,
            2 == A && (A = -1),
            $(S).attr("cgs", A),
            game.chosenGraphicsSet = A,
            $(S).css("background-image", m[A + 1]);
            let f = Players.getMe();
            null != f && (f.destroy(!1),
            f.setupGraphics(!0),
            f.visibilityUpdate(!0)),
            UI.aircraftSelected(f.type)
        }
    });
    $("#sidebar").prepend(S)
}
,
StarMash_2.aircraftSelected = function() {
    for (var d = 0 == game.myGraphicsSet ? "teamImperial" : "teamRebel", c = 1; 5 >= c; c++)
        $("#selectaircraft-" + c).removeClass("teamImperial").removeClass("teamRebel").addClass(d);
    StarMash_2.updateShipNames()
}
,
StarMash_2.updateShipNames = function() {
    let h = {
        1: ["X-Wing"],
        2: ["B-Wing"],
        3: ["A-Wing"],
        4: ["Y-Wing"],
        5: ["Scout ship"],
        101: ["Speed"],
        102: ["Deflector Shields"],
        103: ["Energy Regen"],
        104: ["Laser Speed"]
    }
      , d = {
        1: ["Tie Fighter"],
        2: ["Tie Bomber"],
        3: ["Tie Interceptor"],
        4: ["Tie Advanced"],
        5: ["Tie Phantom"],
        101: ["Speed"],
        102: ["Deflector Shields"],
        103: ["Energy Regen"],
        104: ["Laser Speed"]
    };
    for (var c in game.tooltipValues)
        game.tooltipValues[c][0] = 0 == game.myGraphicsSet ? d[c][0] : h[c][0]
}
,
StarMash_2.mobAdded = function(h, d, c) {
    let m = Mobs.get(h.id)
      , S = -1 < $.inArray(m.type, [1, 2, 3, 5, 6, 7]);
    if (S) {
        if (c) {
            var w = Players.get(c);
            if (0 == w.graphicsSet)
                ;
            else {
                var A = new PIXI.filters.ColorMatrixFilter;
                A.hue(-110),
                m.sprites.sprite.filters = [A]
            }
        } else if (0 == game.myGraphicsSet) {
            var A = new PIXI.filters.ColorMatrixFilter;
            A.hue(-110),
            m.sprites.sprite.filters = [A]
        }
        m.sprites.thruster.alpha = 0,
        m.sprites.thrusterGlow.alpha = 1,
        m.sprites.smokeGlow.alpha = 0,
        2 == m.type ? m.sprites.sprite.scale.set(.3, .4) : 3 == m.type && m.sprites.sprite.scale.set(.56, .4)
    }
}
,
StarMash_2.onScoreboardUpdate = function() {
    let m = SWAM.getLeaders();
    forEachPlayer(S=>{
        let w = ""
          , A = ""
          , f = S.sprites.sprite;
        1 == S.type && (0 == S.graphicsSet ? (A = Textures.get("raptor"),
        w = Textures.get("sith_Infiltrator")) : (A = Textures.get("raptor_2"),
        w = Textures.get("black_Xwing")),
        m[S.id] ? f.texture != w && (f.texture = w) : f.texture != A && (f.texture = A))
    }
    )
}
,
StarMash_2.overridePlayerMethods = function(h) {
    h.setGraphicsSet = function() {
        this.graphicsSet = 2 == game.gameType ? this.team - 1 : this.id == game.myID && -1 != game.chosenGraphicsSet ? game.chosenGraphicsSet : Tools.randInt(0, 1),
        this.id == game.myID && (game.myGraphicsSet = this.graphicsSet)
    }
    ,
    h.setupThrusterColor = function() {
        var d = new PIXI.filters.ColorMatrixFilter
          , c = new PIXI.filters.ColorMatrixFilter;
        0 == this.graphicsSet ? d.hue(-20) : (c.saturate(1, !0),
        d.hue(165)),
        this.sprites.thruster && (this.sprites.thruster.filters = [c, d]),
        this.sprites.thruster1 && (this.sprites.thruster1.filters = [c, d]),
        this.sprites.thruster2 && (this.sprites.thruster2.filters = [c, d])
    }
    ,
    h.setupGraphics = function(d) {
        this.setGraphicsSet();
        var c = 0 == this.graphicsSet ? "" : "_2"
          , m = null;
        switch (this.me() && (m = {
            layer: "aircraftme"
        }),
        this.sprites.powerup = Textures.init("powerupShield", {
            visible: !1,
            alpha: .75
        }),
        this.sprites.powerupCircle = Textures.init("powerupCircle", {
            visible: !1,
            alpha: .75
        }),
        this.type) {
        case 1:
            this.state.baseScale = .25,
            this.state.nameplateDist = 60,
            this.sprites.sprite = Textures.init("shipRaptor" + c, m),
            this.sprites.shadow = Textures.init("shipRaptorShadow" + c, {
                scale: this.state.baseScale * (2.4 / config.shadowScaling)
            }),
            this.sprites.thruster = Textures.init("shipRaptorThruster" + c),
            this.sprites.thrusterGlow = Textures.init("thrusterGlowSmall"),
            this.sprites.thrusterShadow = Textures.init("thrusterShadow");
            break;
        case 2:
            this.state.baseScale = .35,
            this.state.nameplateDist = 60,
            this.sprites.sprite = Textures.init("shipSpirit" + c, m),
            this.sprites.shadow = Textures.init("shipSpiritShadow" + c, {
                scale: this.state.baseScale * (2.4 / config.shadowScaling)
            }),
            this.sprites.thruster1 = Textures.init("shipRaptorThruster" + c),
            this.sprites.thruster2 = Textures.init("shipRaptorThruster" + c),
            this.sprites.thruster1Glow = Textures.init("thrusterGlowSmall"),
            this.sprites.thruster2Glow = Textures.init("thrusterGlowSmall"),
            this.sprites.thruster1Shadow = Textures.init("thrusterShadow"),
            this.sprites.thruster2Shadow = Textures.init("thrusterShadow");
            break;
        case 3:
            this.state.baseScale = .25,
            this.state.nameplateDist = 60,
            this.sprites.sprite = Textures.init("shipComanche" + c, m),
            this.sprites.rotor = Textures.init("shipComancheRotor" + c, m),
            this.sprites.shadow = Textures.init("shipComancheShadow" + c, {
                scale: this.state.baseScale * (2.4 / config.shadowScaling)
            }),
            this.sprites.rotorShadow = Textures.init("shipComancheRotorShadow" + c, {
                scale: 2 * this.state.baseScale * (2.4 / config.shadowScaling)
            });
            break;
        case 4:
            this.state.baseScale = .28,
            this.state.nameplateDist = 60,
            this.sprites.sprite = Textures.init("shipTornado" + c, m),
            this.sprites.shadow = Textures.init("shipTornadoShadow" + c, {
                scale: this.state.baseScale * (2.4 / config.shadowScaling)
            }),
            this.sprites.thruster1 = Textures.init("shipRaptorThruster" + c),
            this.sprites.thruster2 = Textures.init("shipRaptorThruster" + c),
            this.sprites.thruster1Glow = Textures.init("thrusterGlowSmall"),
            this.sprites.thruster2Glow = Textures.init("thrusterGlowSmall"),
            this.sprites.thruster1Shadow = Textures.init("thrusterShadow"),
            this.sprites.thruster2Shadow = Textures.init("thrusterShadow");
            break;
        case 5:
            this.state.baseScale = .28,
            this.state.nameplateDist = 60,
            this.sprites.sprite = Textures.init("shipProwler" + c, m),
            this.sprites.shadow = Textures.init("shipProwlerShadow" + c, {
                scale: this.state.baseScale * (2.4 / config.shadowScaling)
            }),
            this.sprites.thruster1 = Textures.init("shipRaptorThruster" + c),
            this.sprites.thruster2 = Textures.init("shipRaptorThruster" + c),
            this.sprites.thruster1Glow = Textures.init("thrusterGlowSmall"),
            this.sprites.thruster2Glow = Textures.init("thrusterGlowSmall"),
            this.sprites.thruster1Shadow = Textures.init("thrusterShadow"),
            this.sprites.thruster2Shadow = Textures.init("thrusterShadow");
        }
        if ("function" == typeof window.Glow && Glow(this),
        this.setupThrusterColor(),
        (this.reel || d || (this.setupNameplate(),
        this.setupChatBubbles(),
        null != this.level && this.setupLevelPlate()),
        config.debug.collisions)) {
            this.col = new PIXI.Graphics;
            for (var S of config.ships[this.type].collisions)
                this.col.beginFill(16777215, .2),
                this.col.drawCircle(S[0], S[1], S[2]),
                this.col.endFill();
            game.graphics.layers.explosions.addChild(this.col)
        }
    }
    ,
    h.reteam = function(d) {
        var c = this.team;
        this.team = d,
        this.sprites.name.style = new PIXI.TextStyle(this.nameplateTextStyle()),
        UI.changeMinimapTeam(this.id, this.team),
        c != this.team && (this.destroy(!1),
        this.setupGraphics(!0),
        this.visibilityUpdate(!0))
    }
    ,
    h.updateGraphics = function() {
        var c = Tools.oscillator(.025, 1e3, this.randomness) * this.scale
          , m = 1.5 * this.state.thrustLevel
          , S = this.rot
          , w = Graphics.shadowCoords(this.pos);
        if (Graphics.transform(this.sprites.sprite, this.pos.x, this.pos.y, S, c * this.state.baseScale, c * this.state.baseScale),
        Graphics.transform(this.sprites.shadow, w.x, w.y, S, this.state.baseScale * (2.4 / config.shadowScaling) * this.scale, this.state.baseScale * (2.4 / config.shadowScaling) * this.scale),
        this.powerupActive) {
            var A = .35 * (0 == this.state.powerupFadeState ? 2 * (1 - this.state.powerupFade) + 1 : 1 - this.state.powerupFade) * Tools.oscillator(.075, 100, this.randomness)
              , f = .75 * (0 == this.state.powerupFadeState ? Tools.clamp(2 * this.state.powerupFade, 0, 1) : Tools.clamp(1 - 1.3 * this.state.powerupFade, 0, 1)) * this.alpha;
            Graphics.transform(this.sprites.powerup, this.pos.x, this.pos.y - 80, 0, A, A, f),
            Graphics.transform(this.sprites.powerupCircle, this.pos.x, this.pos.y - 80, this.state.powerupAngle, 1.35 * A, 1.35 * A, f)
        }
        var D = Tools.oscillator(.1, .5, this.randomness)
          , C = .01 > Math.abs(this.state.thrustLevel) ? 0 : this.state.thrustLevel / 2 + (0 < this.state.thrustLevel ? .5 : -.5)
          , G = Tools.clamp(2 * Math.abs(this.state.thrustLevel) - .1, 0, 1);
        if (0 == this.graphicsSet)
            switch (this.type) {
            case 1:
                Graphics.transform(this.sprites.thruster, this.pos.x + Math.sin(-S) * (5 * c), this.pos.y + Math.cos(-S) * (5 * c), S + (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * D * C * this.scale, .5 * D * C * this.scale, G),
                this.sprites.thruster.alpha = 0.05,
                Graphics.transform(this.sprites.thrusterGlow, this.pos.x + Math.sin(-S - .5 * this.state.thrustDir) * (40 * c), this.pos.y + Math.cos(-S - .5 * this.state.thrustDir) * (40 * c), null, 1.5 * m * this.scale, 1 * m * this.scale, .3 * this.state.thrustLevel);
                break;
            case 2:
                0 > this.state.thrustLevel && (D *= .7),
                Graphics.transform(this.sprites.thruster1, this.pos.x + Math.sin(-S - .5) * (15 * c), this.pos.y + Math.cos(-S - .5) * (15 * c), S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .4 * D * C * this.scale, .6 * D * C * this.scale, G),
                Graphics.transform(this.sprites.thruster2, this.pos.x + Math.sin(.5 - S) * (15 * c), this.pos.y + Math.cos(.5 - S) * (15 * c), S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .4 * D * C * this.scale, .6 * D * C * this.scale, G),
                Graphics.transform(this.sprites.thruster1Shadow, w.x + Math.sin(-S - .5) * (10 * c) / config.shadowScaling, w.y + Math.cos(-S - .5) * (10 * c) / config.shadowScaling, S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .5 * D * C * this.scale * (4 / config.shadowScaling), .6 * D * C * this.scale * (4 / config.shadowScaling), G / 2.5),
                Graphics.transform(this.sprites.thruster2Shadow, w.x + Math.sin(.5 - S) * (10 * c) / config.shadowScaling, w.y + Math.cos(.5 - S) * (10 * c) / config.shadowScaling, S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .5 * D * C * this.scale * (4 / config.shadowScaling), .6 * D * C * this.scale * (4 / config.shadowScaling), G / 2.5),
                Graphics.transform(this.sprites.thruster1Glow, this.pos.x + Math.sin(-S - .3) * (50 * c), this.pos.y + Math.cos(-S - .3) * (50 * c), null, 2.5 * this.scale, 1.5 * this.scale, .3 * this.state.thrustLevel),
                Graphics.transform(this.sprites.thruster2Glow, this.pos.x + Math.sin(.3 - S) * (50 * c), this.pos.y + Math.cos(.3 - S) * (50 * c), null, 2.5 * this.scale, 1.5 * this.scale, .3 * this.state.thrustLevel);
                break;
            case 3:
                Graphics.transform(this.sprites.rotor, this.pos.x, this.pos.y, this.state.thrustDir, 2 * (c * this.state.baseScale), 2 * (c * this.state.baseScale), .8),
                Graphics.transform(this.sprites.rotorShadow, w.x, w.y, this.state.thrustDir, 2 * (this.state.baseScale * (2.4 / config.shadowScaling) * this.scale), 2 * (this.state.baseScale * (2.4 / config.shadowScaling) * this.scale));
                break;
            case 4:
                0 > this.state.thrustLevel && (D *= .7),
                Graphics.transform(this.sprites.thruster1, this.pos.x + Math.sin(-S - .25) * (5 * c), this.pos.y + Math.cos(-S - .25) * (5 * c), S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * D * C * this.scale, .5 * D * C * this.scale, G),
                Graphics.transform(this.sprites.thruster2, this.pos.x + Math.sin(.25 - S) * (5 * c), this.pos.y + Math.cos(.25 - S) * (5 * c), S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * D * C * this.scale, .5 * D * C * this.scale, G),
                Graphics.transform(this.sprites.thruster1Shadow, w.x + Math.sin(-S - .15) * (28 * c) / config.shadowScaling, w.y + Math.cos(-S - .15) * (28 * c) / config.shadowScaling, S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * D * C * this.scale * (4 / config.shadowScaling), .5 * D * C * this.scale * (4 / config.shadowScaling), G / 2.5),
                Graphics.transform(this.sprites.thruster2Shadow, w.x + Math.sin(.15 - S) * (28 * c) / config.shadowScaling, w.y + Math.cos(.15 - S) * (28 * c) / config.shadowScaling, S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * D * C * this.scale * (4 / config.shadowScaling), .5 * D * C * this.scale * (4 / config.shadowScaling), G / 2.5),
                Graphics.transform(this.sprites.thruster1Glow, this.pos.x + Math.sin(-S - .2) * (45 * c), this.pos.y + Math.cos(-S - .2) * (45 * c), null, 2.5 * this.scale, 1.5 * this.scale, .25 * this.state.thrustLevel),
                Graphics.transform(this.sprites.thruster2Glow, this.pos.x + Math.sin(.2 - S) * (45 * c), this.pos.y + Math.cos(.2 - S) * (45 * c), null, 2.5 * this.scale, 1.5 * this.scale, .25 * this.state.thrustLevel);
                break;
            case 5:
                0 > this.state.thrustLevel && (D *= .7),
                Graphics.transform(this.sprites.thruster1, this.pos.x + Math.sin(-S - .35) * (20 * c), this.pos.y + Math.cos(-S - .35) * (20 * c), S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * D * C * this.scale, .4 * D * C * this.scale, G * this.alpha),
                Graphics.transform(this.sprites.thruster2, this.pos.x + Math.sin(.35 - S) * (20 * c), this.pos.y + Math.cos(.35 - S) * (20 * c), S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * D * C * this.scale, .4 * D * C * this.scale, G * this.alpha),
                Graphics.transform(this.sprites.thruster1Shadow, w.x + Math.sin(-S - .35) * (20 * c) / config.shadowScaling, w.y + Math.cos(-S - .35) * (20 * c) / config.shadowScaling, S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .4 * D * C * this.scale * (4 / config.shadowScaling), .4 * D * C * this.scale * (4 / config.shadowScaling), G * this.alpha / 2.5),
                Graphics.transform(this.sprites.thruster2Shadow, w.x + Math.sin(.35 - S) * (20 * c) / config.shadowScaling, w.y + Math.cos(.35 - S) * (20 * c) / config.shadowScaling, S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .4 * D * C * this.scale * (4 / config.shadowScaling), .4 * D * C * this.scale * (4 / config.shadowScaling), G * this.alpha / 2.5),
                Graphics.transform(this.sprites.thruster1Glow, this.pos.x + Math.sin(-S - .2 - 0 * this.state.thrustDir) * (35 * c), this.pos.y + Math.cos(-S - .2 - 0 * this.state.thrustDir) * (35 * c), null, 2.5 * this.scale, 1.5 * this.scale, .2 * this.state.thrustLevel * this.alpha),
                Graphics.transform(this.sprites.thruster2Glow, this.pos.x + Math.sin(.2 - S - 0 * this.state.thrustDir) * (35 * c), this.pos.y + Math.cos(.2 - S - 0 * this.state.thrustDir) * (35 * c), null, 2.5 * this.scale, 1.5 * this.scale, .2 * this.state.thrustLevel * this.alpha);
            }
        else
            switch (this.type) {
            case 1:
                Graphics.transform(this.sprites.thruster, this.pos.x + Math.sin(-S) * (20 * c), this.pos.y + Math.cos(-S) * (20 * c), S + (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * D * C * this.scale, .5 * D * C * this.scale, G),
                Graphics.transform(this.sprites.thrusterShadow, w.x + Math.sin(-S) * (20 * c) / config.shadowScaling, w.y + Math.cos(-S) * (20 * c) / config.shadowScaling, S + (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .4 * D * C * this.scale * (4 / config.shadowScaling), .5 * D * C * this.scale * (4 / config.shadowScaling), G / 2.5),
                Graphics.transform(this.sprites.thrusterGlow, this.pos.x + Math.sin(-S - .5 * this.state.thrustDir) * (40 * c), this.pos.y + Math.cos(-S - .5 * this.state.thrustDir) * (40 * c), null, 1.5 * m * this.scale, 1 * m * this.scale, .3 * this.state.thrustLevel),
                this.sprites.thruster.scale.x = this.sprites.thruster.scale.y = 0.25;
                break;
            case 2:
                0 > this.state.thrustLevel && (D *= .7),
                Graphics.transform(this.sprites.thruster2, this.pos.x + Math.sin(0.8 - S) * (50 * c), this.pos.y + Math.cos(.8 - S) * (50 * c), S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .4 * D * C * this.scale, .6 * D * C * this.scale, G),
                Graphics.transform(this.sprites.thruster2Shadow, w.x + Math.sin(.5 - S) * (32 * c) / config.shadowScaling, w.y + Math.cos(.5 - S) * (32 * c) / config.shadowScaling, S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .5 * D * C * this.scale * (4 / config.shadowScaling), .6 * D * C * this.scale * (4 / config.shadowScaling), G / 2.5),
                Graphics.transform(this.sprites.thruster2Glow, this.pos.x + Math.sin(.3 - S) * (50 * c), this.pos.y + Math.cos(.3 - S) * (50 * c), null, 2.5 * this.scale, 1.5 * this.scale, .3 * this.state.thrustLevel),
                this.sprites.thruster1.visible = !1,
                this.sprites.thruster1Glow.visible = !1,
                this.sprites.thruster1Shadow.visible = !1;
                break;
            case 3:
                Graphics.transform(this.sprites.rotor, this.pos.x, this.pos.y, this.state.thrustDir, 2 * (c * this.state.baseScale), 2 * (c * this.state.baseScale), .8),
                Graphics.transform(this.sprites.rotorShadow, w.x, w.y, this.state.thrustDir, 2 * (this.state.baseScale * (2.4 / config.shadowScaling) * this.scale), 2 * (this.state.baseScale * (2.4 / config.shadowScaling) * this.scale));
                break;
            case 4:
                0 > this.state.thrustLevel && (D *= .7),
                Graphics.transform(this.sprites.thruster1, this.pos.x + Math.sin(-S - 1) * (20 * c), this.pos.y + Math.cos(-S - 1) * (20 * c), S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * D * C * this.scale, .5 * D * C * this.scale, G),
                Graphics.transform(this.sprites.thruster2, this.pos.x + Math.sin(1 - S) * (20 * c), this.pos.y + Math.cos(1 - S) * (20 * c), S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * D * C * this.scale, .5 * D * C * this.scale, G),
                Graphics.transform(this.sprites.thruster1Shadow, w.x + Math.sin(-S - .15) * (28 * c) / config.shadowScaling, w.y + Math.cos(-S - .15) * (28 * c) / config.shadowScaling, S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * D * C * this.scale * (4 / config.shadowScaling), .5 * D * C * this.scale * (4 / config.shadowScaling), G / 2.5),
                Graphics.transform(this.sprites.thruster2Shadow, w.x + Math.sin(.15 - S) * (28 * c) / config.shadowScaling, w.y + Math.cos(.15 - S) * (28 * c) / config.shadowScaling, S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * D * C * this.scale * (4 / config.shadowScaling), .5 * D * C * this.scale * (4 / config.shadowScaling), G / 2.5),
                Graphics.transform(this.sprites.thruster1Glow, this.pos.x + Math.sin(-S - .2) * (45 * c), this.pos.y + Math.cos(-S - .2) * (45 * c), null, 2.5 * this.scale, 1.5 * this.scale, .25 * this.state.thrustLevel),
                Graphics.transform(this.sprites.thruster2Glow, this.pos.x + Math.sin(.2 - S) * (45 * c), this.pos.y + Math.cos(.2 - S) * (45 * c), null, 2.5 * this.scale, 1.5 * this.scale, .25 * this.state.thrustLevel),
                this.sprites.thruster1.scale.x = this.sprites.thruster1.scale.y = 0.35,
                this.sprites.thruster2.scale.x = this.sprites.thruster2.scale.y = 0.35;
                break;
            case 5:
                0 > this.state.thrustLevel && (D *= .7),
                Graphics.transform(this.sprites.thruster1, this.pos.x + Math.sin(-S - 0.3) * (20 * c), this.pos.y + Math.cos(-S - .35) * (20 * c), S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * D * C * this.scale, .4 * D * C * this.scale, G * this.alpha),
                Graphics.transform(this.sprites.thruster2, this.pos.x + Math.sin(0.3 - S) * (20 * c), this.pos.y + Math.cos(.35 - S) * (20 * c), S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * D * C * this.scale, .4 * D * C * this.scale, G * this.alpha),
                Graphics.transform(this.sprites.thruster1Shadow, w.x + Math.sin(-S - .35) * (20 * c) / config.shadowScaling, w.y + Math.cos(-S - .35) * (20 * c) / config.shadowScaling, S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .4 * D * C * this.scale * (4 / config.shadowScaling), .4 * D * C * this.scale * (4 / config.shadowScaling), G * this.alpha / 2.5),
                Graphics.transform(this.sprites.thruster2Shadow, w.x + Math.sin(.35 - S) * (20 * c) / config.shadowScaling, w.y + Math.cos(.35 - S) * (20 * c) / config.shadowScaling, S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .4 * D * C * this.scale * (4 / config.shadowScaling), .4 * D * C * this.scale * (4 / config.shadowScaling), G * this.alpha / 2.5),
                Graphics.transform(this.sprites.thruster1Glow, this.pos.x + Math.sin(-S - .2 - 0 * this.state.thrustDir) * (35 * c), this.pos.y + Math.cos(-S - .2 - 0 * this.state.thrustDir) * (35 * c), null, 2.5 * this.scale, 1.5 * this.scale, .2 * this.state.thrustLevel * this.alpha),
                Graphics.transform(this.sprites.thruster2Glow, this.pos.x + Math.sin(.2 - S - 0 * this.state.thrustDir) * (35 * c), this.pos.y + Math.cos(.2 - S - 0 * this.state.thrustDir) * (35 * c), null, 2.5 * this.scale, 1.5 * this.scale, .2 * this.state.thrustLevel * this.alpha);
            }
        this.updateNameplate(),
        this.state.bubble && this.updateBubble(),
        config.debug.collisions && this.col && (this.col.position.set(this.pos.x, this.pos.y),
        this.col.rotation = this.rot)
    }
    ,
    h.resetGraphics = function() {
        try {
            this.destroy(!1),
            this.setupGraphics(!0),
            this.visibilityUpdate(!0)
        } catch (d) {}
    }
    ,
    h.resetGraphics(),
    h.me() && UI.aircraftSelected(h.type)
}
,
StarMash_2.prototype.injectTextures = function(h, d, c, m) {
    for (let C in h) {
        var w = h[C];
        w = w.replace("assets/", ""),
        -1 < w.indexOf("?") && (w = w.substr(0, w.indexOf("?"))),
        h[C] = getFilePath(w)
    }
    var A = {
        map_forest_mask: getFilePath("map_forest_mask.jpg"),
        asteroids1: getFilePath("asteroids/asteroids1.png"),
        asteroids2: getFilePath("asteroids/asteroids2.png"),
        asteroids3: getFilePath("asteroids/asteroids3.png")
    };
    for (let C in A)
        h[C] = A[C];
    var f = {
        ui_minimap_1: ["gui", [500, 596, 16, 16]],
        ui_minimap_2: ["gui", [516, 596, 16, 16]],
        ui_minimap_3: ["gui", [532, 596, 16, 16]],
        ui_minimap_target: ["gui", [580, 596, 16, 16]],
        spirit_2: ["aircraft", [4, 260, 512, 256]],
        tornado_2: ["aircraft", [524, 260, 256, 256]],
        raptor_2: ["aircraft", [788, 260, 256, 256]],
        prowler_2: ["aircraft", [1052, 260, 256, 256]],
        comanche_2: ["aircraft", [1316, 260, 128, 256]],
        sith_Infiltrator: ["aircraft", [1540, 4, 256, 256]],
        black_Xwing: ["aircraft", [1540, 260, 256, 256]],
        spirit_shadow_2: ["shadows", [4, 200, 256, 128]],
        tornado_shadow_2: ["shadows", [268, 200, 128, 128]],
        raptor_shadow_2: ["shadows", [540, 200, 128, 128]],
        prowler_shadow_2: ["shadows", [676, 200, 128, 128]],
        comanche_shadow_2: ["shadows", [812, 200, 64, 128]]
    };
    for (let C in f)
        d[C] = f[C];
    var D = {
        minimap1: {
            texture: "ui_minimap_1",
            layer: "ui2",
            anchor: [0.5, 0.5],
            alpha: 1,
            scale: .8
        },
        minimap2: {
            texture: "ui_minimap_2",
            layer: "ui2",
            anchor: [0.5, 0.5],
            alpha: 1,
            scale: .8
        },
        minimap3: {
            texture: "ui_minimap_3",
            layer: "ui2",
            anchor: [0.5, 0.5],
            alpha: 1,
            scale: .8
        },
        minimapTarget: {
            texture: "ui_minimap_target",
            layer: "ui3",
            anchor: [0.5, 0.5],
            alpha: 1,
            scale: .5
        },
        shipRaptor_2: {
            texture: "raptor_2",
            layer: "aircraft",
            anchor: [0.5, 0.6]
        },
        shipRaptorShadow_2: {
            texture: "raptor_shadow_2",
            layer: "shadows",
            anchor: [0.5, 0.57]
        },
        shipRaptorThruster_2: {
            texture: "afterburner",
            layer: "thrusters",
            anchor: [0.5, 0.1],
            scale: [0.25, 0.25]
        },
        shipSpirit_2: {
            texture: "spirit_2",
            layer: "aircraft",
            anchor: [0.5, 0.5]
        },
        shipSpiritShadow_2: {
            texture: "spirit_shadow_2",
            layer: "shadows",
            anchor: [0.5, 0.5]
        },
        shipSpiritThruster_2: {
            texture: "afterburner",
            layer: "thrusters",
            anchor: [0.5, 0.1],
            scale: [0.25, 0.25]
        },
        shipComanche_2: {
            texture: "comanche_2",
            layer: "aircraft",
            anchor: [0.5, 0.4]
        },
        shipComancheShadow_2: {
            texture: "comanche_shadow_2",
            layer: "shadows",
            anchor: [0.5, 0.43]
        },
        shipComancheRotor_2: {
            texture: "comanche_rotor",
            layer: "aircraft",
            anchor: [0.5, 0.5],
            scale: [0.25, 0.25]
        },
        shipComancheRotorShadow_2: {
            texture: "comanche_rotor_shadow",
            layer: "shadows",
            anchor: [0.5, 0.5]
        },
        shipTornado_2: {
            texture: "tornado_2",
            layer: "aircraft",
            anchor: [0.5, 0.65]
        },
        shipTornadoShadow_2: {
            texture: "tornado_shadow_2",
            layer: "shadows",
            anchor: [0.5, 0.605]
        },
        shipProwler_2: {
            texture: "prowler_2",
            layer: "aircraft",
            anchor: [0.5, 0.5]
        },
        shipProwlerShadow_2: {
            texture: "prowler_shadow_2",
            layer: "shadows",
            anchor: [0.5, 0.5]
        }
    };
    for (let C in D)
        m[C] = D[C];
    m.missile.scale = [0.3, 0.3],
    m.missileFat.scale = [0.2, 0.3],
    m.missileSmall.scale = [20, 20]
}
,
StarMash_2.prototype.loadGameModules = function() {
    loadGraphics_SWAM(),
    loadSounds_SWAM()
}
;
function StarMash_1() {
    SWAM.replaceCSS(getFilePath("style.css"));
    let c = new SettingsProvider({
        nebulas: {
            blue: !0,
            green: !0,
            red: !0
        }
    },function(S) {
        let w = S;
        game.graphics.layers.map.children[0].alpha = 0.8,
        game.graphics.layers.map.children[0].visible = w.nebulas.blue,
        game.graphics.layers.map.children[2].alpha = 0.8,
        game.graphics.layers.map.children[2].visible = w.nebulas.green,
        game.graphics.layers.map.children[4].alpha = 0.8,
        game.graphics.layers.map.children[4].visible = w.nebulas.red,
        Graphics.renderbackground()
    }
    );
    c.root = "",
    c.title = "Mod Settings";
    let m = c.addSection("General");
    m.addBoolean("nebulas.blue", "Blue nebulas"),
    m.addBoolean("nebulas.green", "Green nebulas"),
    m.addBoolean("nebulas.red", "Red nebulas"),
    this.settingsProvider = c
}
StarMash_1.themeName = "StarMash v.1, no Parallax",
StarMash_1.author = "Bombita",
StarMash_1.version = SWAM_version,
StarMash_1.prototype.start = function() {
    SWAM.BackgroundFactor = 1,
    SWAM.MoveBackgroundTiles = !0,
    config.overdraw = 256,
    config.overdrawOptimize = !0,
    game.graphics.layers.shadows.visible = !1,
    game.graphics.layers.smoke.visible = !1,
    StarMash_2.addGraphicsSetButton(),
    SWAM.on("playerAdded", StarMash_2.overridePlayerMethods),
    SWAM.on("mobAdded", StarMash_2.mobAdded),
    SWAM.on("scoreboardUpdate", StarMash_2.onScoreboardUpdate),
    SWAM.on("aircraftSelected", StarMash_2.aircraftSelected),
    SWAM.Theme.settingsProvider.apply(SWAM.Settings)
}
,
StarMash_1.prototype.injectTextures = StarMash_2.prototype.injectTextures,
StarMash_1.prototype.loadGameModules = StarMash_2.prototype.loadGameModules;
function VanillaTheme() {
    let d = this
      , m = new SettingsProvider({
        map: {
            sea: !0,
            forest: !0,
            sand: !0,
            rock: !0,
            polygons: !0
        },
        layers: {
            shadows: !0,
            smoke: !0
        },
        gameplay: {
            colorMissiles: !0,
            colorPlayers: !0
        }
    },function(w) {
        d.settings = w;
        let A = w
          , f = game.graphics.layers.sea
          , D = f.children[1]
          , C = game.graphics.layers.map
          , G = C.children[0]
          , L = C.children[1]
          , M = C.children[3]
          , k = C.children[6];
        if (A && A.map) {
            function T() {
                k = C.children[6],
                A.map.polygons ? (k.visible = !0,
                C.mask = k) : (C.mask = null,
                k.visible = !1)
            }
            if (D.visible = A.map.sea,
            G.visible = A.map.forest,
            f.visible = A.map.forest && !A.map.polygons ? !1 : !0,
            L.visible = A.map.sand,
            M.visible = A.map.rock,
            k)
                T();
            else {
                let B = setInterval(function() {
                    game.graphics.layers.map.children[6] && (clearInterval(B),
                    T())
                }, 500)
            }
        }
        A && A.layers && (game.graphics.layers.shadows.visible = A.layers.shadows,
        game.graphics.layers.smoke.visible = A.layers.smoke),
        forEachPlayer(T=>{
            d.tintPlayer(T)
        }
        )
    }
    );
    m.root = "",
    m.title = "Mod Settings";
    let S = m.addSection("Background");
    S.addBoolean("map.sea", "Sea depth"),
    S.addBoolean("map.forest", "Forest"),
    S.addBoolean("map.sand", "Sand"),
    S.addBoolean("map.rock", "Rocks"),
    S.addBoolean("map.polygons", "Continents"),
    S.addBoolean("layers.shadows", "Shadows"),
    S.addBoolean("layers.smoke", "Missile's Smoke"),
    S = m.addSection("Gameplay"),
    S.addBoolean("gameplay.colorMissiles", "Use team colors for missiles."),
    S.addBoolean("gameplay.colorPlayers", "Use team colors for players."),
    this.settingsProvider = m
}
VanillaTheme.themeName = "Vanilla Theme",
VanillaTheme.author = "Bombita",
VanillaTheme.version = SWAM_version,
VanillaTheme.prototype.start = function() {
    config.overdraw = 256,
    config.overdrawOptimize = !0;
    var h = this;
    SWAM.on("playerAdded", function(d) {
        "function" == typeof window.Glow && Glow(d),
        h.tintPlayer(d);
        let c = d.setupGraphics;
        d.setupGraphics = function(S) {
            c.call(d, S),
            "function" == typeof window.Glow && Glow(d),
            h.tintPlayer(d)
        }
        ;
        let m = d.reteam;
        d.reteam = function(S) {
            m.call(d, S),
            h.tintPlayer(d)
        }
    }),
    SWAM.on("mobAdded", function(d, c, m) {
        if (h.settings.gameplay.colorMissiles) {
            let S = Mobs.get(d.id)
              , w = -1 < $.inArray(S.type, [1, 2, 3, 5, 6, 7]);
            if (w) {
                if (2 == game.gameType)
                    if (m) {
                        var A = Players.get(m);
                        1 == A.team ? (S.sprites.sprite.tint = 5592575,
                        S.sprites.thruster.tint = 5592575) : (S.sprites.sprite.tint = 16733525,
                        S.sprites.thruster.tint = 16733525)
                    } else
                        1 == Players.getMe().team ? (S.sprites.sprite.tint = 16733525,
                        S.sprites.thruster.tint = 16733525) : (S.sprites.sprite.tint = 5592575,
                        S.sprites.thruster.tint = 5592575);
                S.sprites.smokeGlow.alpha = 0,
                2 == S.type ? S.sprites.sprite.scale.set(.3, .4) : 3 == S.type ? S.sprites.sprite.scale.set(.56, .4) : S.sprites.sprite.scale.set(.3, .3)
            }
        }
    }),
    SWAM.Theme.settingsProvider.apply(SWAM.Settings)
}
,
VanillaTheme.prototype.tintPlayer = function(h) {
    h.sprites.sprite.tint = this.settings && this.settings.gameplay.colorPlayers ? 1 == h.team ? 10539263 : 2 == h.team ? 16756912 : 16777215 : 16777215
}
,
VanillaTheme.prototype.injectTextures = function() {}
,
VanillaTheme.prototype.injectSounds = function() {}
,
VanillaTheme.prototype.loadGameModules = function() {
    loadGraphics_Default(),
    loadSounds_Default()
}
;
class StPatricksDay2018 extends VanillaTheme {
    constructor() {
        super(),
        $("#logon").css("backgroundColor", "rgba(6, 51, 16, 0.75)")
    }
    injectTextures(h) {
        const w = ["map_forest.jpg", "map_rock.jpg", "map_sand.jpg", "map_sea.jpg", "aircraft.png"];
        for (let A in h) {
            let f = getFileName(h[A]);
            -1 < $.inArray(f, w) && (h[A] = "//molesmalo.github.io/StarWarsMod4AirMash/assets/themes/StPatricksDay2018/" + getFileName(h[A]))
        }
    }
}
StPatricksDay2018.themeName = "St. Patrick's Day 2018 Theme",
StPatricksDay2018.description = "A lucky theme for AirMash!!",
StPatricksDay2018.author = "Bombita";
function getFileName(h) {
    return h = h.substring(h.lastIndexOf("/") + 1),
    -1 < h.indexOf("?") && (h = h.substr(0, h.indexOf("?"))),
    h
}
SWAM.registerExtension({
    name: "StarMash Themes",
    id: "StarMashThemes",
    author: "Bombita",
    version: SWAM_version,
    themes: [VanillaTheme, StarMash_1, StarMash_2, StPatricksDay2018],
    dependencies: []
});
