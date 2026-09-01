"use client"

import Script from "next/script"

/**
 * AnythingLLM embedded chat widget — configured to:
 *  - show the Morched logo inside the open chat window (data-brand-image-url)
 *  - use a Morched-branded assistant name instead of the default
 *    "AnythingLLM Chat Assistant" (data-assistant-name)
 *  - hide AnythingLLM's own "powered by" sponsor line (data-no-sponsor)
 *  - use Morched's brand red for the chat bubble (data-button-color)
 *
 * NOTE on the closed/collapsed bubble icon: AnythingLLM's public embed API
 * (see https://github.com/Mintplex-Labs/anythingllm-embed) only lets you pick
 * data-chat-icon from a fixed set (plus, chatBubble, support, search2,
 * search, magic) — it does not currently accept a custom image URL for that
 * specific closed-state icon, only for the *opened* chat header
 * (data-brand-image-url, used below). "chatBubble" is used here as the
 * closest generic option. The small floating label rendered by
 * <ChatWidgetLabel /> (see widget-language-badge.tsx) sits right next to it
 * to make clear it's Morched's own assistant.
 */
export function AnythingLLMWidget() {
  return (
    <Script
      id="anythingllm-embed-chat-widget"
      src="https://loi.morched.tn/embed/anythingllm-chat-widget.min.js"
      data-embed-id="2696b205-cda6-42dd-a00e-13c66a1c3e28"
      data-base-api-url="https://loi.morched.tn/api/embed"
      data-brand-image-url="https://legale.morched.tn/favicon.svg"
      data-assistant-name="مرشد القانوني الذكي"
      data-no-sponsor="true"
      data-chat-icon="chatBubble"
      data-button-color="#990000"
      data-position="bottom-right"
      data-greeting="مرحبًا 👋 أنا مرشد، مساعدك القانوني الذكي في تونس. اكتب سؤالك بالعربية وسأجيبك."
      strategy="afterInteractive"
    />
  )
}
