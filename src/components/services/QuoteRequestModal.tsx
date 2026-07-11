import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import {
    ArrowRight,
    Bot,
    CheckCircle,
    FileText,
    Loader2,
    Mail,
    Paperclip,
    Send,
    Sparkles,
    Upload,
    User,
    X,
} from "lucide-react";
import { useRef, useState } from "react";

interface QuoteRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
}

const QuoteRequestModal = ({
  isOpen,
  onClose,
  serviceName,
}: QuoteRequestModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    requirements: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call - replace with actual email service later
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // For now, open email client with the data
    const fileNames = files.length > 0 ? `%0D%0A%0D%0AAttached Files: ${files.map(f => f.name).join(', ')}` : '';
    const mailtoLink = `mailto:sabbirahmad653@gmail.com?subject=Custom Quote Request: ${serviceName}&body=Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AService: ${serviceName}%0D%0A%0D%0ARequirements:%0D%0A${encodeURIComponent(formData.requirements)}${fileNames}`;

    window.location.href = mailtoLink;

    setIsSubmitting(false);
    setIsSuccess(true);

    // Reset after showing success
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ name: "", email: "", requirements: "" });
      setFiles([]);
      onClose();
    }, 2000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles].slice(0, 5)); // Max 5 files
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden border-primary/20">
        {/* AI Coming Soon Banner - Highlighted */}
        <motion.div
          initial={{ backgroundPosition: "0% 50%" }}
          animate={{ backgroundPosition: "100% 50%" }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          className="relative overflow-hidden"
          style={{
            background: "linear-gradient(90deg, #8b5cf6, #d946ef, #8b5cf6, #d946ef)",
            backgroundSize: "300% 100%",
          }}
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
          <div className="relative px-6 py-4">
            <div className="flex items-center justify-center gap-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Bot className="w-6 h-6 text-white" />
              </motion.div>
              <div className="text-center">
                <p className="text-white font-bold text-base">
                  🚀 AI Assistant Coming Soon!
                </p>
                <p className="text-white/80 text-xs">
                  Get instant quotes through our smart chatbot
                </p>
              </div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Sparkles className="w-6 h-6 text-yellow-300" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        <div className="p-6">
          <DialogHeader className="mb-5">
            <DialogTitle className="text-2xl font-heading flex items-center gap-2">
              <FileText className="w-6 h-6 text-primary" />
              Request Custom Quote
            </DialogTitle>
            <DialogDescription className="text-base">
              Tell us about your project for{" "}
              <span className="font-semibold text-primary">{serviceName}</span>
            </DialogDescription>
          </DialogHeader>

          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-10"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 10 }}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-5 shadow-lg shadow-green-500/30"
              >
                <CheckCircle className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Request Sent Successfully!
              </h3>
              <p className="text-sm text-muted-foreground text-center max-w-xs">
                I'll review your requirements and get back to you within 24
                hours with a detailed quote.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-semibold">
                    Your Name <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="pl-10 h-11"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold">
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="pl-10 h-11"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirements" className="text-sm font-semibold">
                  Project Requirements <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="requirements"
                  name="requirements"
                  placeholder="Describe your project, features you need, timeline expectations, and any specific requirements..."
                  value={formData.requirements}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="resize-none"
                />
              </div>

              {/* File Upload Section */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold flex items-center gap-2">
                  <Paperclip className="w-4 h-4" />
                  Attachments
                  <span className="text-xs font-normal text-muted-foreground">
                    (Optional - Max 5 files)
                  </span>
                </Label>

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-border rounded-xl p-4 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.figma,.sketch,.xd"
                  />
                  <div className="flex flex-col items-center gap-2 text-center">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <Upload className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Drop files here or click to upload
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PDF, DOC, Images, Figma, Sketch files
                      </p>
                    </div>
                  </div>
                </div>

                {/* File List */}
                {files.length > 0 && (
                  <div className="space-y-2 mt-3">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 px-3 rounded-lg bg-muted/50 border border-border/50"
                      >
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <FileText className="w-4 h-4 text-primary shrink-0" />
                          <span className="text-sm truncate">{file.name}</span>
                          <span className="text-xs text-muted-foreground shrink-0">
                            ({formatFileSize(file.size)})
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="w-6 h-6 rounded-full hover:bg-red-500/10 flex items-center justify-center text-muted-foreground hover:text-red-500 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <p className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
                💡 <strong>Tip:</strong> The more details you provide, the more
                accurate quote you'll receive. Include mockups, references, or
                similar projects if available.
              </p>

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 h-11"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 h-11 group bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Request
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteRequestModal;
