import { CustomButton } from '@/components/ui/custom/button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex justify-center items-center gap-2 mt-12 pb-8">
      <CustomButton
        variant="ghost"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="text-slate-400 hover:text-white disabled:opacity-50"
      >
        Prev
      </CustomButton>
      
      {Array.from({ length: totalPages }).map((_, index) => (
        <CustomButton
          key={index + 1}
          variant="ghost"
          onClick={() => onPageChange(index + 1)}
          className={`w-8 h-8 p-0 ${
            currentPage === index + 1 
              ? "bg-[#2ecc71] text-white hover:bg-[#2ecc71]" 
              : "text-slate-400 hover:text-white"
          }`}
        >
          {index + 1}
        </CustomButton>
      ))}
      
      <CustomButton
        variant="ghost"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="text-slate-400 hover:text-white disabled:opacity-50"
      >
        Next
      </CustomButton>
    </div>
  );
}