// ==UserScript==
// @name         Geizhals.de Preiswecker
// @namespace    https://preiswecker.spyfly.xyz
// @version      0.1
// @description  Allows adding Preisweckers directly from geizhals.de
// @author       Sebastian Heiden
// @match        https://geizhals.de/?cat=*
// @grant        GM.openInTab
// ==/UserScript==

(function() {
    /* Store Auth Token in extension (requires frontend support first) */
    const userToken = null;

    'use strict';
    /* Preiswecker hinzufügen Button */
    let a = document.createElement("a");
    a.text = "Preiswecker setzen";
    a.className = "gh_pag_i";
    a.style = "cursor: pointer;";
    a.id = "preiswecker_btn";
    let div = document.createElement("div");
    div.className = "sorting";
    div.append(a);
    document.querySelector(".sorting-paginator__wrapper").prepend(div);
    /* Preiswecker Button Ende */

    document.querySelector("#preiswecker_btn").addEventListener("click", () => {
        if (!userToken) {
            /* Ask User if he wants to login to our service */
            const doLogin = confirm("Login on preiswecker.spyfly.xyz first.");
            if (doLogin) {
                GM.openInTab("https://preiswecker.spyfly.xyz/login", false);
            }
        } else {

        }
    });
})();