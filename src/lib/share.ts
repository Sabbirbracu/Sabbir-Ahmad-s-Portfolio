// Builds the "share this article" targets. Only platforms with a documented share URL get a real link;
// the rest (Instagram, and Messenger on desktop) have no web share URL, so they copy the link instead.

export interface ShareInput {
  url: string;
  title: string;
  description?: string;
}

export type ShareTargetId = "facebook" | "whatsapp" | "x" | "linkedin" | "messenger" | "gmail" | "telegram" | "instagram";

export interface ShareTarget {
  id: ShareTargetId;
  label: string;
  /** Web share link. Absent for platforms that cannot accept a link from the web. */
  href?: string;
  /** Shown after copying the link for platforms without a share URL. */
  copyHint?: string;
  /** Where to send the user after copying, for those platforms. */
  openAfterCopy?: string;
}

const enc = encodeURIComponent;

export const isMobileDevice = (userAgent: string) => /Android|iPhone|iPad|iPod|Mobile/i.test(userAgent);

export const buildShareTargets = ({ url, title, description }: ShareInput, mobile = false): ShareTarget[] => {
  const text = `${title}`;
  const mailBody = `${description ? `${description}\n\n` : ""}${url}`;

  return [
    { id: "facebook", label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}` },
    { id: "whatsapp", label: "WhatsApp", href: `https://wa.me/?text=${enc(`${text} ${url}`)}` },
    { id: "x", label: "X", href: `https://x.com/intent/post?text=${enc(text)}&url=${enc(url)}` },
    { id: "linkedin", label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}` },
    // Messenger's web share needs a registered Facebook app, but its mobile deep link does not.
    mobile
      ? { id: "messenger", label: "Messenger", href: `fb-messenger://share/?link=${enc(url)}` }
      : {
          id: "messenger",
          label: "Messenger",
          copyHint: "Messenger can't open a share from the web on desktop. The link is copied, so paste it into a chat.",
          openAfterCopy: "https://www.messenger.com/",
        },
    { id: "gmail", label: "Gmail", href: `https://mail.google.com/mail/?view=cm&fs=1&su=${enc(title)}&body=${enc(mailBody)}` },
    { id: "telegram", label: "Telegram", href: `https://t.me/share/url?url=${enc(url)}&text=${enc(text)}` },
    {
      id: "instagram",
      label: "Instagram",
      copyHint: "Instagram doesn't accept links shared from websites. The link is copied, so paste it into a story, bio, or message.",
      openAfterCopy: "https://www.instagram.com/",
    },
  ];
};
