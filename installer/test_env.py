#!/usr/bin/env python3
"""
Pixel Pro Diagnostic & Health Check Script
Verifies FFmpeg, Python runtime, and Whisper AI engine availability.
Outputs JSON for the Premiere Pro CEP Extension UI.
"""
import sys
import json
import subprocess
import shutil

def check_status():
    status = {
        "ffmpeg": False,
        "python": True,
        "whisper": False,
        "whisper_type": "none",
        "python_version": sys.version.split()[0],
        "all_ready": False
    }

    # 1. Check FFmpeg
    if shutil.which("ffmpeg"):
        status["ffmpeg"] = True
    else:
        try:
            res = subprocess.run(["ffmpeg", "-version"], stdout=subprocess.PIPE, stderr=subprocess.PIPE, timeout=3)
            if res.returncode == 0:
                status["ffmpeg"] = True
        except Exception:
            pass

    # 2. Check Whisper (faster-whisper or openai-whisper)
    try:
        import faster_whisper
        status["whisper"] = True
        status["whisper_type"] = "faster-whisper (CTranslate2)"
    except ImportError:
        try:
            import whisper
            status["whisper"] = True
            status["whisper_type"] = "openai-whisper (PyTorch)"
        except ImportError:
            status["whisper"] = False

    status["all_ready"] = status["ffmpeg"] and status["python"] and status["whisper"]
    return status

if __name__ == "__main__":
    result = check_status()
    print(json.dumps(result, indent=2))
    sys.exit(0 if result["all_ready"] else 1)
