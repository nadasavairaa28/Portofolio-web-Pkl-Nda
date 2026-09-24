import customtkinter as ctk

ctk.set_appearance_mode("Dark")
ctk.set_default_color_theme("blue")

class HomeworkApp(ctk.CTk):
    def __init__(self):
        super().__init__()

        self.title("Aplikasi Pengingat PR & Detail Materi")
        self.geometry("820x570")
        self.resizable(False, False)

        self.data_pr = []  # Menyimpan data {frame, checkbox, subject, task, deadline, detail}
        self.active_item = None # Menyimpan item PR yang sedang dilihat detailnya

        # Header Utama
        self.header = ctk.CTkLabel(
            self, 
            text="📚 Catatan PR & Detail Materi Sekolah", 
            font=("Helvetica", 20, "bold")
        )
        self.header.pack(pady=(15, 10))

        # --- CONTAINER UTAMA ---
        self.main_container = ctk.CTkFrame(self, fg_color="transparent")
        self.main_container.pack(padx=15, pady=5, fill="both", expand=True)

        # ================= KIRI / FORM & DAFTAR =================
        self.left_frame = ctk.CTkFrame(self.main_container, width=420)
        self.left_frame.pack(side="left", fill="both", expand=True, padx=(0, 10))

        # Form Input
        self.subject_entry = ctk.CTkEntry(self.left_frame, placeholder_text="Mata Pelajaran (ex: Matematika)", height=32)
        self.subject_entry.pack(pady=(10, 4), padx=10, fill="x")

        self.task_entry = ctk.CTkEntry(self.left_frame, placeholder_text="Judul PR / Tugas (ex: Latihan Hal. 45)", height=32)
        self.task_entry.pack(pady=4, padx=10, fill="x")

        self.deadline_entry = ctk.CTkEntry(self.left_frame, placeholder_text="Tenggat Waktu (ex: Besok jam 08:00)", height=32)
        self.deadline_entry.pack(pady=4, padx=10, fill="x")

        # Label Petunjuk Textbox
        self.detail_label_input = ctk.CTkLabel(self.left_frame, text="Detail / Catatan Materi:", font=("Helvetica", 11))
        self.detail_label_input.pack(anchor="w", padx=10, pady=(4, 0))

        # Input Detail / Catatan Materi Lengkap
        self.detail_textbox_input = ctk.CTkTextbox(self.left_frame, height=65)
        self.detail_textbox_input.pack(pady=(2, 4), padx=10, fill="x")

        # Tombol Tambah
        self.add_btn = ctk.CTkButton(
            self.left_frame, 
            text="+ Tambah PR & Materi", 
            height=35,
            font=("Helvetica", 12, "bold"),
            command=self.add_homework
        )
        self.add_btn.pack(pady=(5, 8), padx=10, fill="x")

        # Area Scrollable Daftar PR
        self.scroll_frame = ctk.CTkScrollableFrame(self.left_frame, height=160)
        self.scroll_frame.pack(pady=5, padx=10, fill="both", expand=True)

        # Tombol Hapus PR yang Dicentang
        self.delete_btn = ctk.CTkButton(
            self.left_frame, 
            text="🗑️ Hapus PR Tercentang (Selesai)", 
            fg_color="#D32F2F", 
            hover_color="#9A0007",
            height=32,
            font=("Helvetica", 12, "bold"),
            command=self.delete_checked_tasks
        )
        self.delete_btn.pack(pady=(5, 10), padx=10, fill="x")

        # ================= KANAN / PANEL DETAIL MATERI =================
        self.right_frame = ctk.CTkFrame(self.main_container)
        self.right_frame.pack(side="right", fill="both", expand=True)

        self.detail_header = ctk.CTkLabel(
            self.right_frame, 
            text="📖 Detail Materi PR", 
            font=("Helvetica", 16, "bold")
        )
        self.detail_header.pack(pady=(10, 5))

        self.subject_label = ctk.CTkLabel(
            self.right_frame, 
            text="Pilih PR di sebelah kiri untuk melihat isi materinya.", 
            font=("Helvetica", 13, "italic"),
            wraplength=320
        )
        self.subject_label.pack(pady=5, padx=10)

        # Textbox tampilan detail (Read-only)
        self.detail_view = ctk.CTkTextbox(self.right_frame, font=("Helvetica", 13))
        self.detail_view.pack(pady=10, padx=10, fill="both", expand=True)

        # Tombol Hapus Tunggal (di panel detail)
        self.delete_single_btn = ctk.CTkButton(
            self.right_frame,
            text="❌ Hapus Tugas Ini",
            fg_color="#D32F2F",
            hover_color="#9A0007",
            height=32,
            font=("Helvetica", 12, "bold"),
            command=self.delete_active_task
        )
        # Sembunyikan tombol hapus tunggal di awal
        self.delete_single_btn.pack_forget()

    def add_homework(self):
        subject = self.subject_entry.get().strip()
        task = self.task_entry.get().strip()
        deadline = self.deadline_entry.get().strip()
        detail = self.detail_textbox_input.get("1.0", "end-1c").strip()

        if subject and task:
            # Frame pembungkus untuk tiap item di daftar
            item_frame = ctk.CTkFrame(self.scroll_frame, fg_color="transparent")
            item_frame.pack(fill="x", pady=4, padx=5)

            checkbox = ctk.CTkCheckBox(item_frame, text="", width=20, checkbox_width=18, checkbox_height=18)
            checkbox.pack(side="left", padx=(0, 5))

            deadline_text = f" ({deadline})" if deadline else ""
            btn_text = f"[{subject}] {task}{deadline_text}"

            item_data = {
                "frame": item_frame,
                "checkbox": checkbox,
                "subject": subject,
                "task": task,
                "deadline": deadline,
                "detail": detail
            }

            # Tombol untuk melihat detail materi
            view_btn = ctk.CTkButton(
                item_frame, 
                text=btn_text, 
                anchor="w",
                fg_color="#2B2B2B", 
                hover_color="#3B3B3B",
                height=30,
                font=("Helvetica", 12),
                command=lambda item=item_data: self.show_detail(item)
            )
            view_btn.pack(side="left", fill="x", expand=True)

            self.data_pr.append(item_data)

            # Reset form input
            self.subject_entry.delete(0, 'end')
            self.task_entry.delete(0, 'end')
            self.deadline_entry.delete(0, 'end')
            self.detail_textbox_input.delete("1.0", "end")

            # Tampilkan detail item yang baru ditambahkan
            self.show_detail(item_data)

    def show_detail(self, item):
        self.active_item = item
        
        self.subject_label.configure(
            text=f"📌 Mapel: {item['subject']}\n📝 Tugas: {item['task']}\n⏰ Tenggat: {item['deadline'] if item['deadline'] else '-'}",
            font=("Helvetica", 13, "bold"),
            justify="left"
        )
        
        self.detail_view.delete("1.0", "end")
        if item['detail']:
            self.detail_view.insert("1.0", item['detail'])
        else:
            self.detail_view.insert("1.0", "(Tidak ada catatan detail materi untuk PR ini.)")

        # Tampilkan tombol hapus tunggal
        self.delete_single_btn.pack(pady=(0, 10), padx=10, fill="x")

    def delete_checked_tasks(self):
        """ Menghapus semua tugas yang centangnya diaktifkan """
        for item in self.data_pr[:]:
            if item["checkbox"].get() == 1:
                item["frame"].destroy()
                if self.active_item == item:
                    self.reset_detail_panel()
                self.data_pr.remove(item)

    def delete_active_task(self):
        """ Menghapus tugas yang sedang dibuka detailnya di panel kanan """
        if self.active_item in self.data_pr:
            self.active_item["frame"].destroy()
            self.data_pr.remove(self.active_item)
            self.reset_detail_panel()

    def reset_detail_panel(self):
        self.active_item = None
        self.subject_label.configure(
            text="Pilih PR di sebelah kiri untuk melihat isi materinya.", 
            font=("Helvetica", 13, "italic")
        )
        self.detail_view.delete("1.0", "end")
        self.delete_single_btn.pack_forget()

if __name__ == "__main__":
    app = HomeworkApp()
    app.mainloop()