// ==UserScript==
// @name         Geizhals.de Preiswecker
// @namespace    https://preiswecker.spyfly.xyz
// @version      0.3
// @description  Allows adding Preisweckers directly from geizhals.de
// @author       Sebastian Heiden
// @match        https://geizhals.de/?cat=*
// @match        https://preiswecker.spyfly.xyz*
// @grant        GM.openInTab
// @grant        GM.getValue
// @grant        GM.setValue
// ==/UserScript==

(async function () {
    'use strict';
    /* Store Auth Token in extension (requires frontend support first) */
    const userToken = await GM.getValue("userToken", "");
    if (window.location.host == "geizhals.de") {
        /* Preiswecker hinzufügen Button */
        let a = document.createElement("a");
        a.text = "Preiswecker setzen";
        a.className = "gh_pag_i";
        a.style = "cursor: pointer;";
        a.id = "preiswecker_btn";
        let div = document.createElement("div");
        let dialogModified = false;
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
                /* Modify Dialog */
                document.querySelector("#dialog-filters-help").style = "display: flex";
                if (!dialogModified) {
                    dialogModified = true;
                    document.querySelector("#dialog-filters-help__dialog__headline__title").innerText = "Preiswecker hinzufügen";
                    document.querySelector(".dialog__content ").innerHTML = `<div class="dialog__content__section">
                    <div class="textfield full-width">
                        <label for="pa_name" class="textfield__label">Name für den Preiswecker:</label>
                        <input id="pa_name" type="text" class="textfield__input" placeholder=" Nintendo Switch">
                    </div>
                    <div class="textfield">
                        <label for="pa_limit" class="textfield__label">Preislimit:</label>
                        <input id="pa_limit" type="number" min="0" inputmode="decimal" class="textfield__input" placeholder=" 5,46">
                    </div>
                </div>
                <div class="dialog__action dialog__action--fixed">
                    <button id="pa_save" class="button">
                        Speichern
                    </button>
                    <button type="button" class="dialog--close button button--outlined">
                        Abbrechen
                   </button>
                </div>`;

                    //Hide Dialog when close btn is clicked
                    for (const closeBtn of document.querySelectorAll(".dialog--close")) {
                        closeBtn.addEventListener("click", () => {
                            //Hide Dialog
                            document.querySelector("#dialog-filters-help").style = "";
                        })
                    }

                    //Init Save Button
                    document.querySelector("#pa_save").addEventListener("click", async () => {
                        //Hide Dialog
                        document.querySelector("#dialog-filters-help").style = "";

                        //Build Req
                        let postBody = new URLSearchParams();
                        postBody.append("name", document.querySelector("#pa_name").value);
                        postBody.append("filterUrl", window.location.href);
                        postBody.append("targetPrice", document.querySelector("#pa_limit").value);

                        fetch("https://preiswecker.spyfly.xyz/api/user/pricealert", {
                            method: "POST",
                            headers: {
                                "Authorization": "Bearer " + userToken,
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            body: postBody.toString()
                        }).then(async function (response) {
                            const json = await response.json();
                            if (json.msg) {
                                alert(json.msg);
                            } else {
                                let errors = [];
                                for (const error of json.errors) {
                                    errors.push(error.msg);
                                }
                                alert(errors.length + " Errors occured:\n - " + errors.join("\n - "))
                            }
                        }).catch(function (error) {
                            console.log(error);
                        });
                    });
                }
            }
        });
    } else {
        const loginInterval = setInterval(function () {
            const tokenDiv = document.querySelector("[data-token]");
            if (tokenDiv) {
                console.debug("Preiswecker: TokenElement found, updating Token!");
                GM.setValue("userToken", tokenDiv.getAttribute("data-token"));
                clearInterval(loginInterval);
            }
        }, 1000);
    }
})();