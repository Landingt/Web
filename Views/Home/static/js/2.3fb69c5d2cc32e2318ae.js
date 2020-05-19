webpackJsonp([2], {
    "1Wz8": function (e, o) { },
    rmE0: function (e, o, t) {
        e.exports = t.p + "static/img/logos.aaf14ad.png"
    },
    xJsL: function (e, o, t) {
        "use strict";
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var s = {
            data: function () {
                return {
                    userName: "",
                    userPwd: "",
                    loading: !1
                }
            },
            mounted: function () {
                this.userName = "",
                    this.userPwd = ""
            },
            methods: {
                login: function () {
                    var e = this;
                    if (this.loading) return !1;
                    this.loading = !0;
                    var o = "username=" + this.userName + "&userpwd=" + this.userPwd;
                    this.Axios.post("/api/server/getkey", o).then(function (o) {
                        var t = o.data.HttpData;
                        switch (t.code) {
                            case 200:
                                var s = t.data,
                                    a = s.appkey + "-" + s.infokey;
                                window.localStorage.setItem("gw_token", a),
                                    window.localStorage.setItem("login_msg", t.message),
                                    e.$store.dispatch("reflashSet"),
                                    e.Axios.defaults.headers.common.Authorization = e.$store.state.gwToken,
                                    e.loading = !1,
                                    e.userName = "",
                                    e.userPwd = "",
                                    e.$router.replace("/index");
                                break;
                            case 1002:
                                e.$Message.error(t.message),
                                    e.loading = !1,
                                    console.log(t);
                                break;
                            case 1003:
                                e.$Message.error("用户名和密码不能为空！"),
                                    e.loading = !1,
                                    console.log(t);
                                break;
                            case 1007:
                                e.$Message.error(t.message),
                                    e.loading = !1,
                                    console.log(t);
                                break;
                            case 1014:
                                e.$Message.error("服务器错误，请检查服务是否正常运行"),
                                    e.loading = !1,
                                    console.log(t);
                                break;
                            default:
                                e.$Message.error("服务器错误，请重试！"),
                                    e.loading = !1,
                                    console.log(t)
                        }
                    }).
                        catch(function (o) {
                            e.$Message.error("网络错误，请重试！"),
                                e.loading = !1,
                                console.log(o)
                        })
                },
                error: function (e, o) {
                    this.$Notice.error({
                        title: "登陆提示",
                        desc: o
                    })
                }
            }
        },
            a = {
                render: function () {
                    var e = this,
                        o = e.$createElement,
                        s = e._self._c || o;
                    return s("Row", {
                        staticClass: "login"
                    },
                        [s("Col", {
                            staticClass: "loginLogo",
                            attrs: {
                                span: "12"
                            }
                        },
                            [s("img", {
                                attrs: {
                                    src: t("rmE0"),
                                    alt: ""
                                }
                            })]), e._v(" "), s("Col", {
                                staticClass: "loginForm",
                                attrs: {
                                    span: "12"
                                }
                            },
                                [s("Row", [s("Col", {
                                    attrs: {
                                        span: "4"
                                    }
                                },
                                    [s("i", {
                                        staticClass: "iconfont icon-scheduleUSER"
                                    })]), e._v(" "), s("Col", {
                                        attrs: {
                                            span: "20"
                                        }
                                    },
                                        [s("input", {
                                            directives: [{
                                                name: "model",
                                                rawName: "v-model",
                                                value: e.userName,
                                                expression: "userName"
                                            }],
                                            attrs: {
                                                type: "text",
                                                placeholder: "用户名",
                                                autocomplete: "off"
                                            },
                                            domProps: {
                                                value: e.userName
                                            },
                                            on: {
                                                input: function (o) {
                                                    o.target.composing || (e.userName = o.target.value)
                                                }
                                            }
                                        })])], 1), e._v(" "), s("Row", [s("Col", {
                                            attrs: {
                                                span: "4"
                                            }
                                        },
                                            [s("i", {
                                                staticClass: "iconfont icon-schedulePASS"
                                            })]), e._v(" "), s("Col", {
                                                attrs: {
                                                    span: "20"
                                                }
                                            },
                                                [s("input", {
                                                    directives: [{
                                                        name: "model",
                                                        rawName: "v-model",
                                                        value: e.userPwd,
                                                        expression: "userPwd"
                                                    }],
                                                    attrs: {
                                                        type: "password",
                                                        placeholder: "密码",
                                                        autocomplete: "off"
                                                    },
                                                    domProps: {
                                                        value: e.userPwd
                                                    },
                                                    on: {
                                                        keyup: function (o) {
                                                            return "button" in o || !e._k(o.keyCode, "enter", 13, o.key, "Enter") ? e.login(o) : null
                                                        },
                                                        input: function (o) {
                                                            o.target.composing || (e.userPwd = o.target.value)
                                                        }
                                                    }
                                                })])], 1), e._v(" "), s("br"), e._v(" "), s("button", {
                                                    class: {
                                                        loading: e.loading
                                                    },
                                                    on: {
                                                        click: function (o) {
                                                            return o.stopPropagation(),
                                                                e.login(o)
                                                        }
                                                    }
                                                },
                                                    [e._v("\n        登陆\n        "), e.loading ? s("Spin", {
                                                        attrs: {
                                                            fix: ""
                                                        }
                                                    },
                                                        [e._v("\n          loading..."), s("Icon", {
                                                            staticClass: "spin-icon-load",
                                                            attrs: {
                                                                type: "load-c",
                                                                size: "18"
                                                            }
                                                        })], 1) : e._e()], 1)], 1)], 1)
                },
                staticRenderFns: []
            };
        var n = t("vSla")(s, a, !1,
            function (e) {
                t("1Wz8")
            },
            null, null);
        o.
            default = n.exports
    }
});
//# sourceMappingURL=2.3fb69c5d2cc32e2318ae.js.map
