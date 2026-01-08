import React from 'react'

const MirrorText = ({content,setContent}: {content :string,setContent:React.Dispatch<React.SetStateAction<string>>}) => {
    const highlightHashtags = (text: string) => {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(
                /#([\w-]+)/g,
                '<span class="hashtag">#$1</span>'
            )
            .replace(/\n/g, '<br />');
    };

    return (
        <div className="relative w-full">
    {/* Highlight layer */}
    <div
        className="absolute inset-0 pointer-events-none whitespace-pre-wrap break-words text-base font-inherit"
        aria-hidden
        dangerouslySetInnerHTML={{
            __html: highlightHashtags(content || ' ')
        }}
    />

    {/* Actual textarea */}
    <textarea
        className="relative w-full min-h-[60px] text-base bg-transparent resize-none outline-none border-none text-transparent caret-black"
        placeholder="Start a thread..."
        value={content}
        style={{ caretColor: 'var(--text-main)' }}
        onChange={(e) => setContent(e.target.value)}
        onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = 'auto';
            target.style.height = Math.max(60, target.scrollHeight) + 'px';
        }}
        rows={2}
    />
</div>

    )
}

export default MirrorText