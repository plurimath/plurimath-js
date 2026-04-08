# frozen_string_literal: true

module PlurimathJs
  module UnitsmlOpalPayloadGenerator
    module_function

    def build_payload_hash(database_path: nil)
      require "unitsdb"

      source_path = database_path || Unitsdb.data_dir
      ::Unitsdb::Database.from_db(source_path).to_hash
    end

    def to_ruby_source(database_hash)
      rendered_hash = ruby_literal(database_hash)

      <<~RUBY
        # frozen_string_literal: true

        require "unitsml"
        require "unitsml/unitsdb"

        Unitsml::Unitsdb::Database.load_opal_payload(
          #{rendered_hash}.freeze,
        )
      RUBY
    end

    def write_to(file_path, database_hash: nil, database_path: nil)
      payload_hash = database_hash || build_payload_hash(database_path: database_path)
      absolute_path = File.expand_path(file_path)

      File.write(absolute_path, to_ruby_source(payload_hash))
      absolute_path
    end

    def ruby_literal(value, indent: 0)
      case value
      when Hash
        ruby_hash_literal(value, indent: indent)
      when Array
        ruby_array_literal(value, indent: indent)
      when String
        ruby_string_literal(value)
      when Numeric, TrueClass, FalseClass, NilClass
        value.inspect
      else
        raise TypeError, "Unsupported payload value: #{value.class}"
      end
    end

    def ruby_hash_literal(hash, indent:)
      return "{}" if hash.empty?

      inner_indent = indent + 2
      lines = hash.map do |key, value|
        rendered_key = ruby_literal(key, indent: inner_indent)
        rendered_value = ruby_literal(value, indent: inner_indent)

        "#{" " * inner_indent}#{rendered_key} => #{rendered_value}"
      end

      "{\n#{lines.join(",\n")}\n#{" " * indent}}"
    end

    def ruby_array_literal(array, indent:)
      return "[]" if array.empty?

      inner_indent = indent + 2
      lines = array.map do |value|
        "#{" " * inner_indent}#{ruby_literal(value, indent: inner_indent)}"
      end

      "[\n#{lines.join(",\n")}\n#{" " * indent}]"
    end

    def ruby_string_literal(value)
      string = value.encode(Encoding::UTF_8)
      escaped = string.each_char.map do |char|
        case char
        when "\\" then "\\\\"
        when "\"" then "\\\""
        when "\n" then "\\n"
        when "\r" then "\\r"
        when "\t" then "\\t"
        else
          char.ord < 0x20 ? "\\u%04X" % char.ord : char
        end
      end.join

      "\"#{escaped}\""
    end
  end
end

if $PROGRAM_NAME == __FILE__
  output_path = ARGV[0]
  database_path = ARGV[1]

  abort "Usage: ruby scripts/generate_unitsml_opal_payload.rb OUTPUT_PATH [DATABASE_PATH]" unless output_path

  PlurimathJs::UnitsmlOpalPayloadGenerator.write_to(
    output_path,
    database_path: database_path,
  )
end
