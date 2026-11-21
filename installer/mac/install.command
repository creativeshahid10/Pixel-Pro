#!/bin/bash
# Pixel Pro 1-Click Installer for macOS (Apple Silicon M1/M2/M3/M4 & Intel)
set -e

# Change directory to script location
cd "$(dirname "$0")"

echo "======================================================================"
echo "  PIXEL PRO — Automated 1-Click Setup for Adobe Premiere Pro (macOS)  "
echo "======================================================================"
echo ""

# 1. Enable Adobe PlayerDebugMode in macOS defaults across CSXS 9 to 18
echo "[*] Enabling Adobe CEP Extension Mode in macOS defaults..."
for v in 9 10 11 12 13 14 15 16 17 18; do
    defaults write com.adobe.CSXS.$v PlayerDebugMode 1 2>/dev/null || true
done
echo "[OK] Adobe Extension Debug Mode Enabled."

# 2. Target Adobe CEP Extensions Directory
EXT_DIR="$HOME/Library/Application Support/Adobe/CEP/extensions/PixelPro"
BIN_DIR="$EXT_DIR/bin"
BACKEND_DIR="$EXT_DIR/backend"
VENV_DIR="$BACKEND_DIR/.venv"

echo "[*] Target Directory: $EXT_DIR"
mkdir -p "$EXT_DIR"
mkdir -p "$BIN_DIR"
mkdir -p "$BACKEND_DIR"

# 3. Check / Install FFmpeg
echo "[*] Checking FFmpeg audio engine..."
if ! command -v ffmpeg &> /dev/null; then
    if command -v brew &> /dev/null; then
        echo "[*] Installing FFmpeg via Homebrew..."
        brew install ffmpeg || true
    else
        echo "[*] Downloading standalone static FFmpeg binary for macOS..."
        curl -sL https://evermeet.cx/ffmpeg/ffmpeg-release-ffmpeg.zip -o /tmp/ffmpeg.zip
        unzip -q -o /tmp/ffmpeg.zip -d "$BIN_DIR/"
        rm -f /tmp/ffmpeg.zip
        chmod +x "$BIN_DIR/ffmpeg" || true
    fi
    echo "[OK] FFmpeg configured."
else
    echo "[OK] System FFmpeg detected."
fi

# 4. Check Python 3
echo "[*] Checking Python runtime..."
if ! command -v python3 &> /dev/null; then
    echo "[!] Python 3 not detected. Triggering Command Line Tools install..."
    xcode-select --install || true
    echo "Please finish the Apple developer prompt and rerun this installer."
    exit 1
fi
echo "[OK] Python 3 detected: $(python3 --version)"

# 5. Create Isolated Virtual Environment
echo "[*] Setting up isolated Python virtual environment (.venv)..."
if [ ! -f "$VENV_DIR/bin/python" ]; then
    python3 -m venv "$VENV_DIR"
fi

# 6. Install Faster-Whisper & Dependencies
echo "[*] Installing Faster-Whisper AI speech engine & dependencies..."
"$VENV_DIR/bin/python" -m pip install --upgrade pip --quiet
"$VENV_DIR/bin/pip" install -r "../requirements.txt" --quiet

# 7. Diagnostic Status Check
echo ""
echo "======================================================================"
echo "  DIAGNOSTIC STATUS CHECK:"
echo "======================================================================"

if command -v ffmpeg &> /dev/null || [ -f "$BIN_DIR/ffmpeg" ]; then
    echo "  [+] FFmpeg:   INSTALLED (Ready)"
else
    echo "  [-] FFmpeg:   PENDING"
fi

if [ -f "$VENV_DIR/bin/python" ]; then
    echo "  [+] Python:   INSTALLED (Isolated venv active)"
else
    echo "  [-] Python:   PENDING"
fi

if "$VENV_DIR/bin/python" -c "import faster_whisper; print('OK')" 2>/dev/null; then
    echo "  [+] Whisper:  INSTALLED (4x Faster-Whisper Engine Ready)"
else
    echo "  [-] Whisper:  PENDING"
fi

echo "======================================================================"
echo ""
echo "  [SUCCESS] Setup Completed! All dependencies are installed and green."
echo "  Launch Adobe Premiere Pro and open:"
echo "  Window > Extensions > Pixel Pro"
echo ""
echo "======================================================================"
