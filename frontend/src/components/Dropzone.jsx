import { Upload, FileText, AlertCircle } from 'lucide-react';
import { useDropzone } from '../hooks/useDropzone';
import { useApp } from '../context/AppContext';

export const Dropzone = () => {
  const { analyzeResume, analysisState, jobDescription } = useApp();
  const { isDragging, validationError, onDragOver, onDragLeave, onDrop, onInputChange, openFilePicker, inputRef } = useDropzone(
    (file) => analyzeResume(file, jobDescription)
  );

  const isDisabled = analysisState.status === 'analyzing';

  return (
    <div className="w-full">
      <div
        onDragOver={!isDisabled ? onDragOver : undefined}
        onDragLeave={!isDisabled ? onDragLeave : undefined}
        onDrop={!isDisabled ? onDrop : undefined}
        onClick={!isDisabled ? openFilePicker : undefined}
        className={`relative border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-300 cursor-pointer select-none
          ${isDragging ? 'border-emerald-500 bg-emerald-50 scale-[1.01]' : 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white'}
          ${isDisabled ? 'opacity-60 cursor-not-allowed pointer-events-none' : ''}
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={onInputChange}
          className="hidden"
          id="resume-upload"
        />

        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors ${isDragging ? 'bg-emerald-100' : 'bg-white border border-slate-200 shadow-sm'}`}>
          <Upload size={24} className={isDragging ? 'text-emerald-600' : 'text-slate-500'} />
        </div>

        <h3 className="text-base font-semibold text-slate-800 mb-1">
          {isDragging ? 'Drop your resume here' : 'Upload your resume'}
        </h3>
        <p className="text-sm text-slate-500 mb-4">
          Drag & drop or <span className="text-emerald-600 font-medium">browse files</span>
        </p>
        <div className="flex items-center justify-center gap-2">
          {[
            { ext: 'PDF', color: 'text-red-500' },
            { ext: 'DOC', color: 'text-blue-500' },
            { ext: 'DOCX', color: 'text-blue-600' },
          ].map(({ ext, color }) => (
            <span key={ext} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs text-slate-500 font-medium shadow-sm">
              <FileText size={12} className={color} /> {ext}
            </span>
          ))}
        </div>
        <p className="text-xs text-slate-400 mt-3">Maximum file size: 5MB</p>
      </div>

      {validationError && (
        <div className="flex items-center gap-2 mt-3 px-4 py-2.5 bg-red-50 border border-red-200 rounded-xl">
          <AlertCircle size={15} className="text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-700">{validationError}</p>
        </div>
      )}
    </div>
  );
};
